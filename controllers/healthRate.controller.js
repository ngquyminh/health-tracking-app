const HealthRate = require("../models/healthRate");
const CustomResponse = require("../constants/response.message");

module.exports = {
  getHealthRate: async (req, res) => {
    const { userId } = req.query;
    try {
      HealthRate.getHealthRate(userId, (err, document) => {
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
    } catch (err) {
      const response = CustomResponse.SERVER_ERROR;
      response.trace = err;
      res.status(500).json(response);
    }
  },
  getHealthRateByType: async (req, res) => {
    const { userId, healthRateType } = req.query;
    try {
      HealthRate.getHealthRateByType(
        userId,
        healthRateType,
        (err, document) => {
          if (err) {
            const response = CustomResponse.SERVER_ERROR;
            response.trace = err;
            res.status(500).json(response);
            return;
          }
          res
            .status(200)
            .json({ ...CustomResponse.SUCCESSFULLY_STATUS, data: document });
        }
      );
    } catch (err) {
      const response = CustomResponse.SERVER_ERROR;
      response.trace = err;
      res.status(500).json(response);
    }
  },
  addHealthRate: async (req, res) => {
    const { userId } = req.query;
    console.log(userId);
    try {
      HealthRate.addHealthRate(userId, req.body, (err, document) => {
        if (err) {
          console.log(err);
          const response = CustomResponse.SERVER_ERROR;
          response.trace = err;
          res.status(500).json(response);
          return;
        }
        res
          .status(200)
          .json({ ...CustomResponse.SUCCESSFULLY_STATUS, data: document });
      });
    } catch (err) {
      const response = CustomResponse.SERVER_ERROR;
      response.trace = err;
      res.status(500).json(response);
    }
  },
  editHealthRate: async (req, res) => {
    try {
      HealthRate.editHealthRate(req.body, (err, document) => {
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
    } catch (err) {
      const response = CustomResponse.SERVER_ERROR;
      response.trace = err;
      res.status(500).json(response);
    }
  },
};
