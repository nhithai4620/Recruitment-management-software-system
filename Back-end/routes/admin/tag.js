var express = require("express");
const tagsController = require("../../controllers/admin/tagsController");
const { verifyToken } = require("../../controllers/verifyToken");
var router = express.Router();

router.post("", verifyToken, tagsController.addTag);

module.exports = router;
