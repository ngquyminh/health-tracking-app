const User = require("../models/user");
const CustomResponse = require("../constants/response.message");
const activity = require("../models/activity");

module.exports = {
  getUserById: async (req, res) => {
    const { id } = req.query;
    try {
      const user = await User.findById(id).exec();
      res.status(200).json({
        ...CustomResponse.SUCCESSFULLY_STATUS,
        data: user,
      });
    } catch (err) {
      const response = CustomResponse.SERVER_ERROR;
      response.trace = err;
      res.status(500).json(response);
    }
  },
  addUser: async (req, res) => {
    try {
      await User.addUser(req.body, (err, document) => {
        if (err) {
          const response = CustomResponse.SERVER_ERROR;
          response.trace = err;
          res.status(500).json(response);
          return;
        }
        res.status(200).json({
          ...CustomResponse.SUCCESSFULLY_STATUS,
          data: document,
        });
      });
    } catch (err) {
      const response = CustomResponse.SERVER_ERROR;
      response.trace = err;
      res.status(500).json(response);
    }
  },
  editUser: async (req, res) => {
    const user = req.body;
    User.editUser(user, (err, document) => {
      if (err) {
        const response = CustomResponse.SERVER_ERROR;
        response.trace = err;
        res.status(500).json(response);
        return;
      }
      res
        .status(200)
        .json({ ...CustomResponse.SUCCESSFULLY_STATUS, data: document });
    });
  },
  login: async (req, res) => {
    User.login(req.body, (err, document) => {
      if (err) {
        const response = CustomResponse.SERVER_ERROR;
        response.trace = err;
        res.status(500).json(response);
        return;
      }
      res.status(200).json({ ...CustomResponse.SUCCESSFULLY_STATUS, data: document });
    });
  },
};
