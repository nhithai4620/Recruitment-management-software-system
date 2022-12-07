const bcrypt = require("bcryptjs");
const {
  uploadToCloudinary,
  uploadFileToCloudinary,
} = require("../utils/cloudinary");
const { bufferToDataURI } = require("../utils/file");
const path = require("path");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");

dotenv.config();

const uploadController = {
  uploadImage: async (req, res) => {
    try {
      const file = req.file;
      const fileFormat = file.mimetype.split("/")[1];
      const { base64 } = bufferToDataURI(fileFormat, file.buffer);

      const imageDetails = await uploadToCloudinary(base64, fileFormat);

      res.json({
        status: "success",
        message: "Upload successful",
        data: imageDetails,
      });
    } catch (err) {
      res.status(500).json(err, { err: "Something went wrong" });
    }
  },
  uploadNonMedia: async (req, res) => {
    try {
      const file = req.file;
      const extName = path.extname(file.originalname).toString();
      const file64 = bufferToDataURI(extName, file.buffer);

      const fileDetails = await uploadFileToCloudinary(file64?.content);

      res.json({
        status: "success",
        message: "Upload successful",
        data: fileDetails,
      });
    } catch (err) {
      res.status(500).json(err, { err: "Something went wrong" });
    }
  },

  uploadFile: async (req, res) => {
    try {
      res.status(200).json("success");
    } catch (error) {
      res.status(500).json(error, { error: "Something went wrong" });
    }
  },

  getFile: async (req, res) => {
    let fileName = req.params.id;
    console.log(fileName);
    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
      const db = client.db("test");
      const collection = db.collection("fs.files");
      const collectionChunks = db.collection("fs.chunks");

      collection.findOne({ filename: fileName }, (err, data) => {
        if (data) {
          collectionChunks
            .find({ files_id: data._id })
            .sort({ n: 1 })
            .toArray(function (err, chunks) {
              if (chunks) {
                let fileData = [];
                for (let i = 0; i < chunks.length; i++) {
                  //This is in Binary JSON or BSON format, which is stored
                  //in fileData array in base64 endocoded string format
                  fileData.push(chunks[i].data.toString("base64"));
                }
                //Display the chunks using the data URI format
                let finalFile = fileData.join("");
                res.status(200).json({ data: finalFile });

                if (err) {
                  res.status(500).json(err);
                }
              } else {
                let fileData = [];
                res.status(200).json({ data: fileData });
              }
            });
        } else {
          let fileData = [];
          res.status(200).json({ data: fileData });
        }
        if (err) {
          res.status(500).json(err);
        }
      });
    });
  },

  deleteFile: async (req, res) => {
    let fileName = req.params.id;
    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
      const db = client.db("test");
      const collection = db.collection("fs.files");
      const collectionChunks = db.collection("fs.chunks");
      collection.findOneAndDelete({ filename: fileName }, (err, data) => {
        if (data) {
          collectionChunks.findOneAndDelete(
            { files_id: data._id },
            (err, data) => {
              if (data) {
                res.status(200).json({ message: "success" });
              } else {
                res.status(500).json(err);
              }
            }
          );
        } else {
          res.status(500).json(err);
        }
      });
    });
  },
};

module.exports = uploadController;
