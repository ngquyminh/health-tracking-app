const mongoose = require("mongoose");
const mongodb = require("mongodb");

const User = require("./user");
const { DOCUMENT_NOT_FOUND } = require("../constants/response.message");

const HealthRateSchema = new mongoose.Schema({
  weight: Number,
  height: Number,
  bmiRate: Number,
  recordedStat: Number,
  ratedDate: Date,
  healthRateType: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

HealthRateSchema.statics.getHealthRate = async function (userId, callback) {
  try {
    const fetchedHealthRate = await this.find({
      user: mongodb.ObjectId(userId),
    }).exec();
    callback(null, fetchedHealthRate);
  } catch (err) {
    callback(err);
  }
};

HealthRateSchema.statics.getHealthRateByType = async function (
  userId,
  healthRateType,
  callback
) {
  try {
    const fetchedHealthRate = await this.find({
      user: mongodb.ObjectId(userId),
      healthRateType,
    }).exec();
    callback(null, fetchedHealthRate);
  } catch (err) {
    callback(err);
  }
};

HealthRateSchema.statics.addHealthRate = async function (
  userId,
  healthRate,
  callback
) {
  const newHealthRate = new this({ ...healthRate });
  try {
    console.log(userId);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      callback(DOCUMENT_NOT_FOUND);
      return;
    }
    newHealthRate.set({ user });
    await newHealthRate.save();
    callback(null, newHealthRate);
  } catch (err) {
    callback(err);
  }
};

HealthRateSchema.statics.editHealthRate = async function (
  healthRate,
  callback
) {
  try {
    const fetchedHealthRate = await this.findOne({ _id: healthRate.id });
    if (!fetchedHealthRate) {
      callback(DOCUMENT_NOT_FOUND);
      return;
    }
    await fetchedHealthRate.set({ ...healthRate }).save();
    callback(null, fetchedUser);
  } catch (err) {
    callback(err);
  }
};

HealthRateSchema.set("toObject", { getters: true });
HealthRateSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("HealthRate", HealthRateSchema);
