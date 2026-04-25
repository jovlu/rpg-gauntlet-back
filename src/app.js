const express = require("express");
const enemiesRouter = require("./routes/enemies.routes");
const movesRouter = require("./routes/moves.routes");
const playerRouter = require("./routes/player.routes");

const app = express();
const allowedOrigin = "http://localhost:5173";

app.use((req, res, next) => {
  if (req.headers.origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());
app.use(movesRouter);
app.use(playerRouter);
app.use(enemiesRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

module.exports = app;
