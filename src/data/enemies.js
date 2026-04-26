const enemies = [
  {
    name: "Witch",
    index: "6.e",
    moves: ["shadow_bolt", "drain_life", "curse", "dark_pact"],
    stats: {
      health: 38,
      attack: 2,
      defense: 2,
      magic: 7,
    },
  },
  {
    name: "Giant Spider",
    index: "7.i",
    moves: ["bite", "web_throw", "pounce", "skitter"],
    stats: {
      health: 58,
      attack: 7,
      defense: 4,
      magic: 1,
    },
  },
  {
    name: "Dragon",
    index: "9.c",
    moves: ["flame_breath", "claw_swipe", "intimidate", "dragon_scales"],
    stats: {
      health: 92,
      attack: 8,
      defense: 6,
      magic: 9,
    },
  },
  {
    name: "Goblin Warrior",
    index: "1.c",
    moves: ["rusty_blade", "dirty_kick", "frenzy", "headbutt"],
    stats: {
      health: 50,
      attack: 6,
      defense: 4,
      magic: 1,
    },
  },
  {
    name: "Goblin Mage",
    index: "1.g",
    moves: ["firebolt", "arcane_surge", "mana_drain", "hex_shield"],
    stats: {
      health: 42,
      attack: 2,
      defense: 3,
      magic: 7,
    },
  },
];

module.exports = enemies;
