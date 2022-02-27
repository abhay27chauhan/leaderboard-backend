const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "id is required"],
      index: true,
    },
    points: {
      type: Number,
      required: [true, "points is required"],
    },
    userId: {
      type: String,
      required: [true, "userId is required"],
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("leaderboard", leaderboardSchema);
