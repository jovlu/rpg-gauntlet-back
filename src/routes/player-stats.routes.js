const express = require("express");
const playerStats = require("../data/player-stats");

const router = express.Router();
const statKeys = ["health", "attack", "defense", "magic"];

router.get("/playerstats", (req, res) => {
  res.status(200).json(playerStats);
});

router.post("/playerstats", (req, res) => {
  const nextStats = req.body;

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
    return total + (nextStats[key] - playerStats[key]);
  }, 0);

  const nextXp = playerStats.xp - xpCost;

  if (nextXp < 0) {
    return res.status(400).json({
      error: "Not enough xp for that stat update.",
    });
  }

  for (const key of statKeys) {
    playerStats[key] = nextStats[key];
  }

  playerStats.xp = nextXp;

  return res.status(200).json(playerStats);
});

module.exports = router;
