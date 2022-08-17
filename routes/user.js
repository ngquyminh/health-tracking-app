const express = require("express");
const userCtrl = require("../controllers/user.controller");

const router = express.Router();

router.get("/get", userCtrl.getUserById);
router.post("/add", userCtrl.addUser);
router.put("/edit", userCtrl.editUser);
router.post("/login", userCtrl.login);

module.exports = router;
