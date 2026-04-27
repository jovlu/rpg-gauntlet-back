const enemies = [
  {
    name: "Witch",
    index: "6.e",
    level: 1,
    moves: ["shadow_bolt", "drain_life", "curse", "dark_pact"],
    stats: {
      health: 42,
      attack: 2,
      defense: 3,
      magic: 8,
    },
  },
  {
    name: "Giant Spider",
    index: "7.i",
    level: 2,
    moves: ["bite", "web_throw", "pounce", "skitter"],
    stats: {
      health: 66,
      attack: 8,
      defense: 5,
      magic: 1,
    },
  },
  {
    name: "Dragon",
    index: "9.c",
    level: 3,
    moves: ["flame_breath", "claw_swipe", "intimidate", "dragon_scales"],
    stats: {
      health: 102,
      attack: 9,
      defense: 7,
      magic: 11,
    },
  },
  {
    name: "Goblin Warrior",
    index: "1.c",
    level: 4,
    moves: ["rusty_blade", "dirty_kick", "frenzy", "headbutt"],
    stats: {
      health: 114,
      attack: 10,
      defense: 8,
      magic: 1,
    },
  },
  {
    name: "Goblin Mage",
    index: "1.g",
    level: 5,
    moves: ["firebolt", "arcane_surge", "mana_drain", "hex_shield"],
    stats: {
      health: 128,
      attack: 3,
      defense: 10,
      magic: 16,
    },
  },
];

module.exports = enemies;
