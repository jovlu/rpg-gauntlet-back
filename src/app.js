const express = require("express");
const battleRouter = require("./routes/battle.routes");
const enemiesRouter = require("./routes/enemies.routes");
const movesRouter = require("./routes/moves.routes");
const playerRouter = require("./routes/player.routes");
const qtesRouter = require("./routes/qtes.routes");

const app = express();
const DEFAULT_ALLOWED_ORIGINS = ["https://gauntlet.b-cdn.net"];

function getAllowedOrigins() {
  const configuredOrigins = process.env.CORS_ORIGINS;

  if (!configuredOrigins) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  return configuredOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());
app.use(battleRouter);
app.use(movesRouter);
app.use(playerRouter);
app.use(enemiesRouter);
app.use(qtesRouter);

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
