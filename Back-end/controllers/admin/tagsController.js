const bcrypt = require("bcryptjs");
const { Tags } = require("../../models/tag");

const tagsController = {
  getTag: async (req, res) => {
    try {
      const requisitionId = req.params;
      Tags.findById({ _id: requisitionId.id }, (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      }).populate("assignedRecruiter", "email firstName lastName phone");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addTag: async (req, res) => {
    try {
      let tag = req.body;

      Tags.findOne({ name: tag.name }, async (err, data) => {
        if (!data) {
          const newTags = new Tags(tag);
          const saveTags = await newTags.save();
          res.status(200).json({ message: "success", data: saveTags });
        } else {
          res.status(500).json({ status: "error", error: "Tag already had" });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = tagsController;
