var express = require("express");
const jobRequisitionController = require("../../controllers/admin/jobRequisitionController");
const { verifyToken } = require("../../controllers/verifyToken");
var router = express.Router();

router.post("", verifyToken, jobRequisitionController.addJobRequisition);

router.get("", verifyToken, jobRequisitionController.listRequisition);

router.get(
  "/candidates/:id",
  verifyToken,
  jobRequisitionController.getCandidate
);

router.get("/:id", verifyToken, jobRequisitionController.getOneRequisition);

router.put("/:id", verifyToken, jobRequisitionController.updateJobRequisition);

router.delete("/:id", verifyToken, jobRequisitionController.deleteRequisition);

module.exports = router;
