require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { connect } = require("./utils/db");
const leaderboardRouter = require("./resources/leaderboard/leaderboard.router");
require("./helpers/cached");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Welcome to leaderboard-app backend"));

app.use("/api/leaderboard", leaderboardRouter);

const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`REST API on http://localhost:${process.env.PORT}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  start,
};
