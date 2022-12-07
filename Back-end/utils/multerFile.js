const multer = require("multer");
const dotenv = require("dotenv");
const { GridFsStorage } = require("multer-gridfs-storage");

dotenv.config();

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  file: (req, file) => {
    const name = req.query.id;
    // instead of an object a string is returned
    return name;
  },
});

const uploadStorage = multer({ storage: storage }).any();
module.exports = { uploadStorage };
