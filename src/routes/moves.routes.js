const express = require("express");
const moves = require("../data/moves");
const unlockedMoves = require("../data/unlocked-moves");

const router = express.Router();

router.get("/moves", (req, res) => {
  res.status(200).json({
    moves: Object.values(moves),
  });
});

router.get("/moves/unlocked", (req, res) => {
  res.status(200).json({
    unlockedMoves,
  });
});

router.put("/moves/unlocked", (req, res) => {
  const moveId = req.body?.moveId;
  const nextMoves = req.body?.moves;

  if (moveId !== undefined) {
    if (typeof moveId !== "string") {
      return res.status(400).json({
        error: 'Field "moveId" must be a string.',
      });
    }

    if (!moves[moveId]) {
      return res.status(400).json({
        error: `Move "${moveId}" does not exist.`,
      });
    }

    if (!unlockedMoves.includes(moveId)) {
      unlockedMoves.push(moveId);
    }

    return res.status(200).json({
      unlockedMoves,
    });
  }

  if (Array.isArray(nextMoves)) {
    const uniqueMoves = new Set(nextMoves);

    if (uniqueMoves.size !== nextMoves.length) {
      return res.status(400).json({
        error: "Duplicate move ids are not allowed.",
      });
    }

    for (const unlockedMoveId of nextMoves) {
      if (typeof unlockedMoveId !== "string") {
        return res.status(400).json({
          error: "Every move id must be a string.",
        });
      }

      if (!moves[unlockedMoveId]) {
        return res.status(400).json({
          error: `Move "${unlockedMoveId}" does not exist.`,
        });
      }
    }

    unlockedMoves.splice(0, unlockedMoves.length, ...nextMoves);

    return res.status(200).json({
      unlockedMoves,
    });
  }

  return res.status(400).json({
    error: 'Send either "moveId" or "moves" in the request body.',
  });
});

router.get("/moves/:moveId", (req, res) => {
  const move = moves[req.params.moveId];

  if (!move) {
    return res.status(404).json({
      error: "Move not found",
    });
  }

  return res.status(200).json({
    move,
  });
});

module.exports = router;
