const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { Permission } = require("../../models/permission");
const { Contacts } = require("../../models/contact");
const { Note } = require("../../models/note");
const { JobRequisition } = require("../../models/jobRequisition");

const recruitersController = {
  listUser: async (req, res) => {
    try {
      data = User.find((err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      })
        .populate("permission contact note")
        .populate("jobTitle", "jobTitle");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  listUserShort: async (req, res) => {
    try {
      data = User.find((err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      }).select("firstName lastName email");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getRecruiter: async (req, res) => {
    try {
      const recruiterId = req.params;
      User.findById({ _id: recruiterId.id }, (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ error: err, message: "Recruiter Not found" });
        }
      })
        .populate("permission contact note")
        .populate("jobTitle");
    } catch (error) {
      console.log(error);
      res.status(500).json(err);
    }
  },

  deleteRecruiter: async (req, res) => {
    try {
      const recruiterId = req.params;
      User.findByIdAndRemove({ _id: recruiterId.id }, (err, data) => {
        if (data) {
          res.status(200).json({ message: "success" });
        } else {
          res.status(500).json(err);
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteJob: async (req, res) => {
    try {
      const userId = req.params.id;
      const jobId = req.body.jobId;
      const updateUser = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $pull: {
            jobTitle: jobId,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json({
        error: err,
        message: "Delete recruiter failed, please try again!",
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const requestId = req.params;
      let request = req.body;
      const date = new Date();

      if (req.body.hasOwnProperty("password")) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        request = { ...req.body, password: hashed };
      }

      request = { ...request, updated_at: date };

      const newContact = {
        name: request?.firstName + " " + request?.lastName,
        email: request.email,
        phone: request?.phone,
        avatar: request?.avatar,
        website: request?.website,
        location: request?.location,
        facebook: request?.facebook,
        linkedin: request?.linkedin,
        twitter: request?.twitter,
      };

      const newNote = {
        note: request?.note,
        owner: request.owner,
        shared: request?.shared,
        updatedAt: date,
      };

      if (request.noteId) {
        const updateNote = await Note.findByIdAndUpdate(
          { _id: request.noteId },
          newNote
        );
        res.status(200).json(updateNote);
      } else {
        if (request.contactId) {
          const updateContact = await Contacts.findByIdAndUpdate(
            { _id: request.contactId },
            newContact,
            {
              new: true,
            }
          );
        }

        const updateUser = await User.findByIdAndUpdate(
          { _id: requestId.id },
          request,
          {
            new: true,
          }
        );

        res.status(200).json(updateUser);
      }
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Update recruiter failed, please try again!",
      });
    }
  },

  addUser: async (req, res) => {
    try {
      var personInfo = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      User.findOne({ email: personInfo.email }, async (err, data) => {
        if (!data) {
          const newContact = await new Contacts({
            name: personInfo?.firstName + " " + personInfo?.lastName,
            email: personInfo.email,
            phone: personInfo?.phone,
            avatar: personInfo?.avatar,
          });

          const newNote = await new Note({
            note: "",
            owner: "admin",
            shared: false,
          });

          const saveNote = await newNote.save();

          const saveContact = await newContact.save();

          const jobsId = [];

          personInfo?.jobTitle.forEach((element) => {
            jobsId.push(element._id);
          });

          if (personInfo.permission) {
            const newUser = await new User({
              email: personInfo.email,
              password: hashed,
              contact: saveContact._id,
              firstName: personInfo?.firstName,
              lastName: personInfo?.lastName,
              dob: personInfo?.dob,
              gender: personInfo?.gender,
              permission: personInfo?.permission,
              jobTitle: personInfo?.jobTitle,
              note: saveNote._id,
            });

            const saveUser = await newUser.save();

            res.status(200).json(saveUser);
          } else {
            const newUser = await new User({
              email: personInfo.email,
              password: hashed,
              contact: saveContact._id,
              firstName: personInfo?.firstName,
              lastName: personInfo?.lastName,
              dob: personInfo?.dob,
              gender: personInfo?.gender,
              jobTitle: personInfo?.jobTitle,
              note: saveNote._id,
            });
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);
          }
        } else {
          res.status(500).json({
            status: "error",
            error: "Username already in use",
            message: "Username already in use",
          });
        }
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Update recruiter failed, please try again!",
      });
    }
  },
};

module.exports = recruitersController;
