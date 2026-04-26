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

  // Possible values come from the QTE registry, for example:
  // "", "mash_spacebar", "click_bubbles", "keyboard_buttons",
  // "type_words", "mouse_path", "hold_release",
  // "shrinking_target_click", "arrow_sequence", "dodge_lanes",
  // "follow_moving_target"
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
      // Possible values: "self", "enemy"
      target: "self",

      // Possible values: "health", "attack", "defense", "magic"
      stat: "attack",
      amount: 0,
      durationRounds: 0,
    },
  ],
};

module.exports = moveBlueprint;
