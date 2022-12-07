var express = require("express");
const uploadController = require("../controllers/uploadController");
var router = express.Router();

router.post("/cloudinary-image", uploadController.uploadImage);
router.post("/cloudinary-file", uploadController.uploadNonMedia);
router.post("/upload-file", uploadController.uploadFile);
router.get("/get-file/:id", uploadController.getFile);
router.delete("/delete-file/:id", uploadController.deleteFile);

module.exports = router;
