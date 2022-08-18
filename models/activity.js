const mongoose = require("mongoose");
const mongodb = require("mongodb");

const User = require("./user");
const { DOCUMENT_NOT_FOUND } = require("../constants/response.message");

const ActivitySchema = new mongoose.Schema({
  activityType: String,
  startedTime: Date,
  endedTime: Date,
  duration: Number,
  step: Number,
  sleepRate: Number,
  tripA: String,
  tripB: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

ActivitySchema.statics.getAcitivityById = async function (
  activityId,
  callback
) {
  try {
    const fetchtedActivity = await this.findOne({ _id: activityId });
    if (!fetchedActivity) {
      callBack(DOCUMENT_NOT_FOUND);
    } else {
      callback(null, fetchtedActivity);
    }
  } catch (err) {
    callback(err);
  }
};

ActivitySchema.statics.addActivity = async function (
  userId,
  activity,
  callback
) {
  const newActivity = new this({ ...activity });
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      callback(DOCUMENT_NOT_FOUND);
    } else {
      newActivity.set({ user });
      await newActivity.save();
      callback(null, newActivity);
    }
  } catch (err) {
    callback(err);
  }
};

ActivitySchema.statics.editActivity = async function (activity, callback) {
  try {
    const fetchedActivity = await this.findOne({ _id: activity.id });
    if (!fetchedActivity) {
      callback(DOCUMENT_NOT_FOUND);
      return;
    }
    this.update({ _id: activity.id }, activity, (err, document) => {
      if (err) {
        callback(err);
      } else {
        callback(null, document);
      }
    });
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

ActivitySchema.statics.removeActivity = async function (activityId, callback) {
  try {
    const deletedActivity = await this.deleteOne({
      _id: activityId,
    });
    callback(null, deletedActivity);
  } catch (err) {
    callback(err);
  }
};

ActivitySchema.statics.fetchUserActivities = async function (userId, callback) {
  try {
    const activities = await this.find({
      user: mongodb.ObjectId(userId),
    }).exec();
    callback(null, activities);
  } catch (err) {
    callback(err);
  }
};

ActivitySchema.statics.fetchActivitiesInTimeInterval = async function (
  userId,
  startedTime,
  endedTime,
  callback
) {
  try {
    const startedTimeISO = new Date(startedTime).toISOString();
    const endedTimeISO = new Date(endedTime).toISOString();
    const activities = await this.find({
      user: mongodb.ObjectId(userId),
      startedTime: {
        $gt: startedTimeISO,
        $lt: endedTimeISO,
      },
    }).exec();
    callback(null, activities);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

ActivitySchema.set("toObject", { getters: true });
ActivitySchema.set("toJSON", { getters: true });

module.exports = mongoose.model("Activity", ActivitySchema);
