const bcrypt = require("bcryptjs");
const { JobRequisition } = require("../../models/jobRequisition");
const { Note } = require("../../models/note");

const jobRequisitionController = {
  getOneRequisition: async (req, res) => {
    try {
      const requisitionId = req.params;
      JobRequisition.findById({ _id: requisitionId.id }, (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      }).populate("note");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addJobRequisition: async (req, res) => {
    try {
      let jr = req.body;

      const newNote = await new Note({
        note: "",
        owner: "admin",
        shared: false,
      });

      const saveNote = await newNote.save();

      jr = { ...jr, is_active: true, note: saveNote._id };

      if (!jr.jobType) {
        res.status(404).json({ message: "Job type is require" });
      } else if (!jr.jobCategories) {
        res.status(404).json({ message: "Job categories is require" });
      } else if (jr.jobTitle) {
        JobRequisition.findOne({ jobTitle: jr.jobTitle }, async (err, data) => {
          if (!data) {
            const newJR = new JobRequisition(jr);
            const saveJR = await newJR.save();
            res.status(200).json({ message: "success", data: saveJR });
          } else {
            res
              .status(500)
              .json({ status: "error", error: "Job requisition already had" });
          }
        });
      } else {
        res.status(404).json({ message: "Job title is require" });
      }
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Add job failed, please try again!",
      });
    }
  },

  updateJobRequisition: async (req, res) => {
    try {
      let jr = req.body;
      const requisitionId = req.params;
      const date = new Date();

      jr = { ...jr, updated_at: date };

      const newNote = {
        note: jr?.note,
        owner: jr?.owner,
        shared: jr?.shared,
        updatedAt: date,
      };

      if (jr.noteId) {
        const updateNote = await Note.findByIdAndUpdate(
          { _id: jr.noteId },
          newNote
        );
        res.status(200).json(updateNote);
      } else {
        JobRequisition.findByIdAndUpdate(
          { _id: requisitionId.id },
          jr,
          { new: true },
          (err, data) => {
            if (data) {
              res.status(200).json({ message: "success", data: data });
            } else {
              res.status(500).json(err);
            }
          }
        );
      }
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Update job failed, please try again!",
      });
    }
  },

  listRequisition: async (req, res) => {
    try {
      JobRequisition.find((err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  listRequisitionShort: async (req, res) => {
    try {
      JobRequisition.find((err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      }).select("jobTitle");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteRequisition: async (req, res) => {
    try {
      const request = req.params;
      JobRequisition.findByIdAndRemove({ _id: request.id }, (err, data) => {
        if (data) {
          res.status(200).json({ message: "success" });
        } else {
          res.status(500).json(err);
        }
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Delete job failed, please try again!",
      });
    }
  },
};

module.exports = jobRequisitionController;
