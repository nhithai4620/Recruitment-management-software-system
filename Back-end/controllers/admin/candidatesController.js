const { Candidates } = require("../../models/candidates");
const { Contacts } = require("../../models/contact");
const { Note } = require("../../models/note");

const candidatesController = {
  addCandidate: async (req, res) => {
    try {
      var candidate = req.body;
      Candidates.findOne({ email: candidate.email }, async (err, data) => {
        if (!data) {
          const newContact = await new Contacts({
            name: candidate?.firstName + " " + candidate?.lastName,
            email: candidate?.email,
            phone: candidate?.phone,
          });

          const newNote = await new Note({
            note: "",
            owner: "admin",
            shared: false,
          });

          const saveContact = await newContact.save();
          const saveNote = await newNote.save();

          const newCandidate = await new Candidates({
            email: candidate?.email,
            contact: saveContact?._id,
            firstName: candidate?.firstName,
            lastName: candidate?.lastName,
            dob: candidate?.dob,
            jobTitle: candidate?.jobTitle,
            experience: candidate?.experience,
            GPA: candidate?.experience,
            salaryExpected: candidate?.salaryExpected,
            note: saveNote?._id,
          });

          const saveCandidate = await newCandidate.save();

          if (saveCandidate) {
            res.status(200).json(saveCandidate);
          } else {
            res.status(500).json(err);
          }
        } else {
          res.status(500).json({
            status: "error",
            error: "Candidate already exists",
            message: "Candidate already exists",
          });
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  listCandidate: async (req, res) => {
    try {
      Candidates.find((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      }).populate("contact note jobTitle");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCandidate: async (req, res) => {
    try {
      const candidateId = req.params.id;
      Candidates.findByIdAndRemove({ _id: candidateId }, (err, data) => {
        if (data) {
          res.status(200).json({ message: "success" });
        } else {
          res.status(500).json(err);
        }
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Delete candidate failed, please try again!",
      });
    }
  },

  getCandidate: async (req, res) => {
    try {
      const candidateId = req.params.id;
      Candidates.findById({ _id: candidateId }, (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      }).populate("contact note jobTitle");
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Get candidate failed, please try again!",
      });
    }
  },
  updateCandidate: async (req, res) => {
    try {
      const candidateId = req.params.id;
      let candidate = req.body;
      const date = new Date();

      candidate = { ...candidate, updated_at: date };

      const newContact = {
        name: candidate?.firstName + " " + candidate?.lastName,
        email: candidate?.email,
        phone: candidate?.phone,
        avatar: candidate?.avatar,
        website: candidate?.website,
        location: candidate?.location,
        facebook: candidate?.facebook,
        linkedin: candidate?.linkedin,
        twitter: candidate?.twitter,
      };

      const newNote = {
        note: candidate?.note,
        owner: candidate.owner,
        shared: candidate?.shared,
        updatedAt: date,
      };

      if (candidate.noteId) {
        console.log(candidate);
        const updateNote = await Note.findByIdAndUpdate(
          { _id: candidate.noteId },
          newNote
        );
        res.status(200).json(updateNote);
      } else {
        if (candidate.contactId) {
          const updateContact = await Contacts.findByIdAndUpdate(
            { _id: candidate.contactId },
            newContact
          );
        }

        const updateCandidate = await Candidates.findByIdAndUpdate(
          { _id: candidateId },
          candidate,
          {
            new: true,
          }
        );

        res.status(200).json(updateCandidate);
      }
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Update candidate failed, please try again!",
      });
    }
  },
};

module.exports = candidatesController;
