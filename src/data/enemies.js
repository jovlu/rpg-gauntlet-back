const enemies = [
  {
    name: "Witch",
    index: "6.e",
    level: 1,
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
    level: 2,
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
    level: 3,
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
    level: 4,
    moves: ["rusty_blade", "dirty_kick", "frenzy", "headbutt"],
    stats: {
      health: 102,
      attack: 9,
      defense: 7,
      magic: 1,
    },
  },
  {
    name: "Goblin Mage",
    index: "1.g",
    level: 5,
    moves: ["firebolt", "arcane_surge", "mana_drain", "hex_shield"],
    stats: {
      health: 118,
      attack: 3,
      defense: 9,
      magic: 15,
    },
  },
];

module.exports = enemies;
