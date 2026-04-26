const qtes = {
  mash_space: {
    id: "mash_space",
    name: "Mash Space",
    qte: "mash_spacebar",
    qteValue: 5,
    description: "Mash the spacebar as many times as possible in 5 seconds.",
  },
  bubble_pop: {
    id: "bubble_pop",
    name: "Bubble Pop",
    qte: "click_bubbles",
    qteValue: 7,
    description: "Click 7 random bubbles before they disappear.",
  },
  random_keys: {
    id: "random_keys",
    name: "Random Keys",
    qte: "keyboard_buttons",
    qteValue: 8,
    description: "Press 8 random keyboard buttons in order.",
  },
  type_words: {
    id: "type_words",
    name: "Type Words",
    qte: "type_words",
    qteValue: ["gauntlet", "lantern", "thunder", "wyrmfire"],
    description: "Type one random word from the list quickly and correctly.",
  },
  mouse_path: {
    id: "mouse_path",
    name: "Mouse Path",
    qte: "mouse_path",
    qteValue: 3,
    description: "Trace a longer path with the mouse before time runs out.",
  },
  hold_release: {
    id: "hold_release",
    name: "Hold And Release",
    qte: "hold_release",
    qteValue: 4,
    description: "Hold a key and release it as close to 4 seconds as possible.",
  },
  shrinking_target: {
    id: "shrinking_target",
    name: "Shrinking Target",
    qte: "shrinking_target_click",
    qteValue: 6,
    description: "Click 6 shrinking targets before they vanish.",
  },
  arrow_chain: {
    id: "arrow_chain",
    name: "Arrow Chain",
    qte: "arrow_sequence",
    qteValue: 7,
    description: "Input a sequence of 7 random arrow directions.",
  },
  dodge_lane: {
    id: "dodge_lane",
    name: "Dodge Lane",
    qte: "dodge_lanes",
    qteValue: 6,
    description: "Swap between lanes to avoid 6 incoming hazards.",
  },
  cursor_chase: {
    id: "cursor_chase",
    name: "Cursor Chase",
    qte: "follow_moving_target",
    qteValue: 4,
    description: "Keep the cursor on a moving target for 4 seconds.",
  },
};

module.exports = qtes;
