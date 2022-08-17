const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const healthRate = new mongoose.Schema({
  weight: Number,
  height: Number,
  bmiRate: Number,
  createdDate: Date,
  height: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("HealthRate", healthRate);
