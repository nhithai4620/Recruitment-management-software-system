var express = require("express");
const activitiesController = require("../../controllers/admin/activitiesController");
const { verifyToken } = require("../../controllers/verifyToken");
var router = express.Router();

router.post("", verifyToken, activitiesController.addActivity);

router.get("", verifyToken, activitiesController.listActivity);

router.get("/:id", verifyToken, activitiesController.getActivity);

router.delete("/:id", verifyToken, activitiesController.deleteActivity);

router.put("/:id", verifyToken, activitiesController.updateActivity);

module.exports = router;
