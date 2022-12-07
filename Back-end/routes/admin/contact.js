var express = require("express");
const contactsController = require("../../controllers/admin/contactController");
const { verifyToken } = require("../../controllers/verifyToken");
var router = express.Router();

router.post("", verifyToken, contactsController.addContact);

router.get("", verifyToken, contactsController.listContact);

router.get("/:id", verifyToken, contactsController.getContact);

router.delete("/:id", verifyToken, contactsController.deleteContact);

router.put("/:id", verifyToken, contactsController.updateContact);

module.exports = router;
