var express = require("express");
const candidatesController = require("../../controllers/admin/candidatesController");
const { verifyToken } = require("../../controllers/verifyToken");
var router = express.Router();

router.post("", verifyToken, candidatesController.addCandidate);

router.get("", verifyToken, candidatesController.listCandidate);

router.get("/:id", verifyToken, candidatesController.getCandidate);

router.delete("/:id", verifyToken, candidatesController.deleteCandidate);

router.put("/:id", verifyToken, candidatesController.updateCandidate);

module.exports = router;
