var express = require("express");
const sendEmailController = require("../controllers/sendMailController");
var router = express.Router();
const { verifyToken } = require("../controllers/verifyToken");

router.post("/", verifyToken, sendEmailController.sendEmail);

module.exports = router;
