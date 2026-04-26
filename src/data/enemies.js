const enemies = [
  {
    name: "Witch",
    index: "6.e",
    moves: ["shadow_bolt", "drain_life", "curse", "dark_pact"],
    stats: {
      health: 78,
      attack: 4,
      defense: 6,
      magic: 13,
    },
  },
  {
    name: "Giant Spider",
    index: "7.i",
    moves: ["bite", "web_throw", "pounce", "skitter"],
    stats: {
      health: 96,
      attack: 13,
      defense: 9,
      magic: 2,
    },
  },
  {
    name: "Dragon",
    index: "9.c",
    moves: ["flame_breath", "claw_swipe", "intimidate", "dragon_scales"],
    stats: {
      health: 150,
      attack: 15,
      defense: 14,
      magic: 16,
    },
  },
  {
    name: "Goblin Warrior",
    index: "1.c",
    moves: ["rusty_blade", "dirty_kick", "frenzy", "headbutt"],
    stats: {
      health: 92,
      attack: 12,
      defense: 8,
      magic: 1,
    },
  },
  {
    name: "Goblin Mage",
    index: "1.g",
    moves: ["firebolt", "arcane_surge", "mana_drain", "hex_shield"],
    stats: {
      health: 74,
      attack: 3,
      defense: 7,
      magic: 12,
    },
  },
];

module.exports = enemies;
