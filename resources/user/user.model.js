const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "id is required"]
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);