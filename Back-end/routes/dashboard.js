var express = require("express");
const dashboardController = require("../controllers/admin/dashboardController");
const { verifyToken } = require("../controllers/verifyToken");
var router = express.Router();

router.get("", verifyToken, dashboardController.getData);

module.exports = router;
