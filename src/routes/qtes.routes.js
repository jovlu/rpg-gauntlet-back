const express = require("express");
const qtes = require("../data/qtes");

const router = express.Router();

router.get("/qtes", (req, res) => {
  res.status(200).json({
    qtes: Object.values(qtes),
  });
});

module.exports = router;
