const enemies = [
  {
    name: "Witch",
    index: "6.e",
    moves: ["shadow_bolt", "drain_life", "curse", "dark_pact"],
    stats: {
      health: 85,
      attack: 6,
      defense: 8,
      magic: 15,
    },
  },
  {
    name: "Giant Spider",
    index: "7.i",
    moves: ["bite", "web_throw", "pounce", "skitter"],
    stats: {
      health: 95,
      attack: 14,
      defense: 10,
      magic: 4,
    },
  },
  {
    name: "Dragon",
    index: "9.c",
    moves: ["flame_breath", "claw_swipe", "intimidate", "dragon_scales"],
    stats: {
      health: 140,
      attack: 18,
      defense: 16,
      magic: 18,
    },
  },
  {
    name: "Goblin Warrior",
    index: "1.c",
    moves: ["rusty_blade", "dirty_kick", "frenzy", "headbutt"],
    stats: {
      health: 90,
      attack: 13,
      defense: 9,
      magic: 3,
    },
  },
  {
    name: "Goblin Mage",
    index: "1.g",
    moves: ["firebolt", "arcane_surge", "mana_drain", "hex_shield"],
    stats: {
      health: 80,
      attack: 4,
      defense: 8,
      magic: 14,
    },
  },
];

module.exports = enemies;
