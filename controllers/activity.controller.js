const Activity = require("../models/activity");
const CustomResponse = require("../constants/response.message");

module.exports = {
  getActivityById: async (req, res) => {
    const { id } = req.query;
    try {
      const activity = await Activity.findById(id).exec();
      res.status(200).json({
        ...CustomResponse.SUCCESSFULLY_STATUS,
        data: activity,
      });
    } catch (err) {
      const response = CustomResponse.SERVER_ERROR;
      response.trace = err;
      res.status(500).json(response);
    }
  },
  getUserActivities: async (req, res) => {
    const { userId } = req.query;
    try {
      await Activity.fetchUserActivities(userId, (err, document) => {
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
  addActivity: async (req, res) => {
    const { userId } = req.query;
    try {
      await Activity.addActivity(userId, req.body, (err, document) => {
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
  editActivity: async (req, res) => {
    const activity = req.body;
    Activity.editActivity(activity, (err, document) => {
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
  deleteActivity: async (req, res) => {
    const { id } = req.body;
    try {
      Activity.removeActivity = async(id, (err, document) => {
        if (err) {
          const response = CustomResponse.SERVER_ERROR;
          response.trace = err;
          res.status(500).json(response);
          return;
        }
        res.status(200).json(CustomResponse.SUCCESSFULLY_STATUS);
      });
    } catch (err) {
      const response = CustomResponse.SERVER_ERROR;
      response.trace = err;
      res.status(500).json(response);
    }
  },
};
