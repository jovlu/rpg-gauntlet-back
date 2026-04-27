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

  const selectedMoveId =
    availableMoveIds[Math.floor(Math.random() * availableMoveIds.length)];

  return res.status(200).json({
    moveId: selectedMoveId,
    move: moves[selectedMoveId] ?? null,
  });
}

router.get("/battle/enemy-move", handleEnemyMoveRequest);
router.post("/battle/enemy-move", handleEnemyMoveRequest);

module.exports = router;
