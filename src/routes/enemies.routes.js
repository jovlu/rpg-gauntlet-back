const express = require("express");
const enemies = require("../data/enemies");

const router = express.Router();

router.get("/enemies", (req, res) => {
  res.status(200).json({
    enemies,
  });
});

module.exports = router;
