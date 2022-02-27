const { Router } = require("express");
const {
  getDataPagewise,
  updateUserPoints,
} = require("./leaderboard.controllers");

const leaderboardRouter = Router();

leaderboardRouter.route("/").get(getDataPagewise);

leaderboardRouter.route("/update-points").post(updateUserPoints);

module.exports = leaderboardRouter;
