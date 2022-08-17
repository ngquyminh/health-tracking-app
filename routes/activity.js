const express = require("express");
const activityCtrl = require("../controllers/activity.controller");

const router = express.Router();

router.get("/get", activityCtrl.getActivityById);
router.post("/add", activityCtrl.addActivity);
router.get("/getUserActivities", activityCtrl.getUserActivities);

module.exports = router;
