const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const recordSchema = new mongoose.Schema({
  recordType: String,
  recordedDate: Date,
  recorededStat: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("Record", recordSchema);
