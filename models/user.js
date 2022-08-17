const mongoose = require("mongoose");
const generateHashedPwd = require("../utils");

const {
  DOCUMENT_NOT_FOUND,
  SERVER_ERROR,
} = require("../constants/response.message");

const UserSchema = new mongoose.Schema({
  email: String,
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: Date,
  activeRate: Number,
});

UserSchema.statics.getUserById = async function (userId, callback) {
  try {
    const fetchedUser = await this.findOne({ _id: userId });
    if (!fetchedUser) {
      callback(DOCUMENT_NOT_FOUND);
      return;
    }
    callback(null, fetchedUser);
  } catch (err) {
    callback(err);
  }
};

UserSchema.statics.addUser = async function (user, callback) {
  const { userName, password } = user;
  try {
    const hashedPassword = generateHashedPwd(userName, password);
    const newUser = new this({ ...user, password: hashedPassword });
    await newUser.save();
    callback(null, newUser);
  } catch (err) {
    callback(err);
  }
};

UserSchema.statics.editUser = async function (user, callback) {
  const { userName, password } = user;
  try {
    const fetchedUser = await this.findOne({ _id: user.id });
    if (!fetchedUser) {
      callback(DOCUMENT_NOT_FOUND);
      return;
    }
    let hashedPassword = fetchedUser.password;
    if (password && userName) {
      hashedPassword = generateHashedPwd(userName, password);
    }
    await fetchedUser.set({ ...user, password: hashedPassword }).save();
    callback(null, fetchedUser);
  } catch (err) {
    callback(err);
  }
};

UserSchema.statics.login = async function (user, callback) {
  const { userName, password } = user;
  try {
    const fetchedUser = await this.findOne({ userName });
    if (!fetchedUser) {
      callback(DOCUMENT_NOT_FOUND);
      return;
    }
    const hashedPassword = generateHashedPwd(userName, password);
    if (fetchedUser.password !== hashedPassword) {
      callback(SERVER_ERROR);
      return;
    }
    callback(null);
  } catch (err) {
    callback(err);
  }
};

UserSchema.set("toObject", { getters: true });
UserSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("User", UserSchema);
