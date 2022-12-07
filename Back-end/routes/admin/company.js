var express = require("express");
const CompanyProfileController = require("../../controllers/admin/adminController");
const RecruitersController = require("../../controllers/admin/recruitersController");
const jobRequisitionController = require("../../controllers/admin/jobRequisitionController");
const { verifyToken } = require("../../controllers/verifyToken");
var router = express.Router();

// router.post("/add-profile", CompanyProfileController.addProfile);
router.get("/profile", verifyToken, CompanyProfileController.profile);

router.post(
  "/update-profile",
  verifyToken,
  CompanyProfileController.updateProfile
);

router.post(
  "/create-permission",
  verifyToken,
  CompanyProfileController.createPermission
);

router.get(
  "/list-permission",
  verifyToken,
  CompanyProfileController.listPermission
);

router.get("/requests", verifyToken, CompanyProfileController.listRequest);

router.delete(
  "/requests/:id",
  verifyToken,
  CompanyProfileController.deleteRequest
);

router.put(
  "/requests/:id",
  verifyToken,
  CompanyProfileController.updateRequest
);

router.get("/recruiters", verifyToken, RecruitersController.listUser);

router.get("/recruiters/:id", verifyToken, RecruitersController.getRecruiter);

router.delete(
  "/recruiters/:id",
  verifyToken,
  RecruitersController.deleteRecruiter
);

router.put("/recruiters/:id", verifyToken, RecruitersController.updateUser);

router.post("/recruiters", verifyToken, RecruitersController.addUser);

router.get(
  "/recruiters-short",
  verifyToken,
  RecruitersController.listUserShort
);

router.get(
  "/requisitions",
  verifyToken,
  jobRequisitionController.listRequisitionShort
);

router.put("/recruiters-job/:id", verifyToken, RecruitersController.deleteJob);

module.exports = router;
