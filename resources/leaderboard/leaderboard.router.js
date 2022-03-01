const { Router } = require("express");
const { cached } = require("../../helpers/cached");
const {
  getDataPagewise,
  updateUserPoints,
} = require("./leaderboard.controllers");

const leaderboardRouter = Router();

leaderboardRouter.route("/").get(cached, getDataPagewise);
// leaderboardRouter.route("/").get(getDataPagewise);

leaderboardRouter.route("/update-points").post(updateUserPoints);

module.exports = leaderboardRouter;
