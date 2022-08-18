const express = require("express");
const healthRateCtrl = require("../controllers/healthRate.controller");

const router = express.Router();

router.get("/get", healthRateCtrl.getHealthRate);
router.get("/getByType", healthRateCtrl.getHealthRateByType);
router.post("/add", healthRateCtrl.addHealthRate);
router.put("/edit", healthRateCtrl.editHealthRate);

module.exports = router;
