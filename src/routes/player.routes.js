const express = require("express");
const moves = require("../data/moves");
const player = require("../data/player");
const unlockedMoves = require("../data/unlocked-moves");

const router = express.Router();
const statKeys = ["health", "attack", "defense", "magic"];

router.get("/player", (req, res) => {
  res.status(200).json({
    player,
  });
});

router.put("/player/stats", (req, res) => {
  const nextStats = req.body;
  const currentStats = player.stats;

  if (!nextStats || typeof nextStats !== "object" || Array.isArray(nextStats)) {
    return res.status(400).json({
      error: "Request body must be a JSON object.",
    });
  }

  for (const key of statKeys) {
    if (typeof nextStats[key] !== "number") {
      return res.status(400).json({
        error: `Field "${key}" must be a number.`,
      });
    }

    if (nextStats[key] < 0) {
      return res.status(400).json({
        error: `Field "${key}" cannot be negative.`,
      });
    }
  }

  const xpCost = statKeys.reduce((total, key) => {
    return total + (nextStats[key] - currentStats[key]);
  }, 0);

  const nextXp = currentStats.xp - xpCost;

  if (nextXp < 0) {
    return res.status(400).json({
      error: "Not enough xp for that stat update.",
    });
  }

  for (const key of statKeys) {
    currentStats[key] = nextStats[key];
  }

  currentStats.xp = nextXp;

  return res.status(200).json({
    stats: currentStats,
  });
});

router.put("/player/moves", (req, res) => {
  const nextMoves = req.body?.moves;

  if (!Array.isArray(nextMoves)) {
    return res.status(400).json({
      error: 'Field "moves" must be an array of move ids.',
    });
  }

  const uniqueMoves = new Set(nextMoves);

  if (uniqueMoves.size !== nextMoves.length) {
    return res.status(400).json({
      error: "Duplicate move ids are not allowed.",
    });
  }

  for (const moveId of nextMoves) {
    if (typeof moveId !== "string") {
      return res.status(400).json({
        error: "Every move id must be a string.",
      });
    }

    if (!moves[moveId]) {
      return res.status(400).json({
        error: `Move "${moveId}" does not exist.`,
      });
    }

    if (!unlockedMoves.includes(moveId)) {
      return res.status(400).json({
        error: `Move "${moveId}" is not unlocked.`,
      });
    }
  }

  player.moves = [...nextMoves];

  return res.status(200).json({
    moves: player.moves,
  });
});

module.exports = router;
