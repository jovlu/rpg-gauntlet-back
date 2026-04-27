const express = require("express");
const moves = require("../data/moves");

const router = express.Router();

function parseBattleState(req) {
  if (req.method === "GET") {
    const serializedState = req.query?.state;

    if (typeof serializedState !== "string") {
      return null;
    }

    try {
      return JSON.parse(serializedState);
    } catch {
      return null;
    }
  }

  return req.body?.battleState ?? null;
}

function toMoveId(move) {
  if (typeof move === "string") {
    return move;
  }

  if (move && typeof move === "object" && typeof move.id === "string") {
    return move.id;
  }

  return null;
}

function getAvailableEnemyMoveIds(enemy) {
  if (!enemy || typeof enemy !== "object" || Array.isArray(enemy)) {
    return null;
  }

  if (!Array.isArray(enemy.moves)) {
    return null;
  }

  if (!enemy.cooldowns || typeof enemy.cooldowns !== "object" || Array.isArray(enemy.cooldowns)) {
    return null;
  }

  return enemy.moves
    .map(toMoveId)
    .filter((moveId) => typeof moveId === "string" && moves[moveId])
    .filter((moveId) => Number(enemy.cooldowns[moveId] ?? 0) <= 0);
}

function getEffectiveStats(combatant) {
  const baseStats = combatant?.baseStats ?? {};
  const modifiers = combatant?.statModifiers ?? {};

  return {
    health: Math.max(1, Number(baseStats.health ?? 0) + Number(modifiers.health ?? 0)),
    attack: Math.max(0, Number(baseStats.attack ?? 0) + Number(modifiers.attack ?? 0)),
    defense: Math.max(0, Number(baseStats.defense ?? 0) + Number(modifiers.defense ?? 0)),
    magic: Math.max(0, Number(baseStats.magic ?? 0) + Number(modifiers.magic ?? 0)),
  };
}

function getScalingTotal(move, actorStats) {
  return (
    Number(move.attackScaling ?? 0) * actorStats.attack +
    Number(move.magicScaling ?? 0) * actorStats.magic +
    Number(move.defenseScaling ?? 0) * actorStats.defense +
    Number(move.healthScaling ?? 0) * actorStats.health
  );
}

function getScalingMultiplier(move, actorStats) {
  const scalingTotal = getScalingTotal(move, actorStats);
  return scalingTotal === 0 ? 1 : scalingTotal;
}

function getScaledMagnitude(baseValue, move, actorStats) {
  if (!baseValue) {
    return 0;
  }

  return Math.round(Number(baseValue) * getScalingMultiplier(move, actorStats));
}

function hasEquivalentStatus(combatant, effect) {
  if (!combatant || !Array.isArray(combatant.activeStatuses)) {
    return false;
  }

  return combatant.activeStatuses.some((status) => {
    if (!status || typeof status !== "object") {
      return false;
    }

    return (
      status.stat === effect.stat &&
      Math.sign(Number(status.amount ?? 0)) === Math.sign(Number(effect.amount ?? 0)) &&
      Number(status.remainingTurns ?? 0) > 0
    );
  });
}

function scoreStatusEffect(effect, actor, target, turnCount) {
  const amount = Number(effect.amount ?? 0);

  if (amount === 0 || Number(effect.durationRounds ?? 0) <= 0) {
    return 0;
  }

  if (effect.target === "self" && amount > 0) {
    if (hasEquivalentStatus(actor, effect)) {
      return -4;
    }

    const baseWeight = effect.stat === "attack" || effect.stat === "magic" ? 7 : 6;
    return Math.abs(amount) * baseWeight + (turnCount <= 2 ? 6 : 2);
  }

  if (effect.target === "enemy" && amount < 0) {
    if (hasEquivalentStatus(target, effect)) {
      return -3;
    }

    const baseWeight = effect.stat === "defense" ? 7 : 6;
    return Math.abs(amount) * baseWeight + (turnCount <= 3 ? 5 : 1);
  }

  return 0;
}

function scoreMove(move, battleState) {
  const actor = battleState.enemy;
  const target = battleState.player;
  const actorStats = getEffectiveStats(actor);
  const targetStats = getEffectiveStats(target);
  const actorMaxHealth = Math.max(1, Number(actor.maxHealth ?? actorStats.health));
  const currentHealth = Math.max(0, Number(actor.currentHealth ?? actorMaxHealth));
  const missingHealth = Math.max(0, actorMaxHealth - currentHealth);
  const healthRatio = currentHealth / actorMaxHealth;

  const physicalDamage = Math.max(
    0,
    getScaledMagnitude(move.physicalDamage, move, actorStats) - targetStats.defense,
  );
  const magicalDamage = Math.max(
    0,
    getScaledMagnitude(move.magicalDamage, move, actorStats),
  );
  const trueDamage = Math.max(0, getScaledMagnitude(move.trueDamage, move, actorStats));
  const damage = physicalDamage + magicalDamage + trueDamage;

  const selfHeal =
    Math.max(0, getScaledMagnitude(move.healSelf, move, actorStats)) +
    Math.max(0, getScaledMagnitude(move.trueHealSelf, move, actorStats));
  const selfDamage =
    Math.max(
      0,
      getScaledMagnitude(move.physicalDamageSelf, move, actorStats) - actorStats.defense,
    ) +
    Math.max(0, getScaledMagnitude(move.magicalDamageSelf, move, actorStats)) +
    Math.max(0, getScaledMagnitude(move.trueDamageSelf, move, actorStats));

  let score = damage;

  if (selfHeal > 0 && missingHealth > 0) {
    const healWeight = healthRatio <= 0.35 ? 1.6 : healthRatio <= 0.55 ? 1 : 0.4;
    score += Math.min(selfHeal, missingHealth) * healWeight;
  }

  score -= selfDamage * 1.1;

  for (const effect of move.statusEffects ?? []) {
    score += scoreStatusEffect(effect, actor, target, Number(battleState.turnCount ?? 1));
  }

  if (damage > 0 && Number(battleState.turnCount ?? 1) > 3) {
    score += 2;
  }

  return score;
}

function chooseEnemyMoveId(battleState, availableMoveIds) {
  let bestMoveId = availableMoveIds[0] ?? null;
  let bestScore = Number.NEGATIVE_INFINITY;

  for (const moveId of availableMoveIds) {
    const move = moves[moveId];

    if (!move) {
      continue;
    }

    const score = scoreMove(move, battleState);

    if (score > bestScore) {
      bestScore = score;
      bestMoveId = moveId;
    }
  }

  return bestMoveId;
}

function handleEnemyMoveRequest(req, res) {
  const battleState = parseBattleState(req);

  if (!battleState || typeof battleState !== "object" || Array.isArray(battleState)) {
    return res.status(400).json({
      error: 'A valid battle state is required. Send it as "state" for GET or "battleState" for POST.',
    });
  }

  const availableMoveIds = getAvailableEnemyMoveIds(battleState.enemy);

  if (!availableMoveIds) {
    return res.status(400).json({
      error: 'Battle state must include enemy "moves" and "cooldowns".',
    });
  }

  if (availableMoveIds.length === 0) {
    return res.status(200).json({
      moveId: null,
      move: null,
    });
  }

  const selectedMoveId = chooseEnemyMoveId(battleState, availableMoveIds);

  return res.status(200).json({
    moveId: selectedMoveId,
    move: moves[selectedMoveId] ?? null,
  });
}

router.get("/battle/enemy-move", handleEnemyMoveRequest);
router.post("/battle/enemy-move", handleEnemyMoveRequest);

module.exports = router;
