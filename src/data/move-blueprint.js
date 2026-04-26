// This is the backend move schema for the current combat model.
// It assumes one shared scaling block per move, which is enough for the
// current roster. If a future move needs different scaling rules for separate
// effects inside the same move, split that move into an effects array later.
const moveBlueprint = {
  id: "slash",
  name: "Slash",
  icon: "",
  iconName: "",
  iconIndex: "",
  qte: "",
  qteValue: null,
  description:
    "Physical attack that deals moderate damage. Scales off Attack and is reduced by target Defense.",

  // Optional helper for abilities that apply a timed stat change.
  durationRounds: 0,

  // Base outputs before scaling.
  physicalDamage: 0,
  magicalDamage: 0,
  trueDamage: 0,
  physicalDamageSelf: 0,
  magicalDamageSelf: 0,
  trueDamageSelf: 0,
  healSelf: 0,
  healOther: 0,
  trueHealSelf: 0,
  trueHealOther: 0,

  // Shared scaling block for the move.
  // Final value = base value + sum(casterStat * correspondingScaling).
  attackScaling: 0,
  magicScaling: 0,
  defenseScaling: 0,
  healthScaling: 0,

  // Positive amount = buff, negative amount = debuff.
  statusEffects: [
    {
      target: "self",
      stat: "attack",
      amount: 0,
      durationRounds: 0,
    },
  ],
};

module.exports = moveBlueprint;
