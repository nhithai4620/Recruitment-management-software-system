var express = require("express");
const authController = require("../../controllers/admin/authController");
var router = express.Router();

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);

router.post("/refresh-token", authController.requestRefreshToken);

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
