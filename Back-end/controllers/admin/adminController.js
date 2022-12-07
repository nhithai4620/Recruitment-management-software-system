const bcrypt = require("bcryptjs");
const { Contacts } = require("../../models/contact");
const { CompanyProfile } = require("../../models/companyProfile");
const { Permission } = require("../../models/permission");
const { Requests } = require("../../models/request");
const { User } = require("../../models/user");
var ObjectID = require("mongodb").ObjectID;

const CompanyProfileController = {
  profile: async (req, res) => {
    try {
      CompanyProfile.find((err, data) => {
        if (data) {
          res.status(200).json(data);
        }
      }).populate("contact");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateProfile: async (req, res) => {
    try {
      // if (req.body.hasOwnProperty("password")) {
      //   const salt = await bcrypt.genSalt(10);
      //   const hashed = await bcrypt.hash(req.body.password, salt);
      //   req.body = { ...req.body, password: hashed };
      // }

      const companyInfo = req.body.companyInfo;
      const contact = req.body.contactDetails;

      Contacts.updateOne(
        { _id: ObjectID("6334fc2811b6b477bd5136e6") },
        { $set: contact },
        (err, data) => {
          if (data) {
            console.log(data);
          } else {
            console.log(err);
          }
        }
      );

      CompanyProfile.updateOne(
        { _id: ObjectID("6334fe12179fa38513291bc0") },
        { $set: companyInfo },
        (err, data) => {
          if (data) {
            console.log(data);
          } else {
            console.log(err);
          }
        }
      );
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json(err);
    }
  },

  createPermission: async (req, res) => {
    try {
      const permission = req.body;
      if (permission.role) {
        Permission.findOne({ role: permission.role }, async (err, data) => {
          if (!data) {
            const newPermission = new Permission(permission);
            const savePermission = await newPermission.save();
            res.status(200).json(savePermission);
          } else {
            res
              .status(500)
              .json({ status: "error", error: "Permission already had" });
          }
        });
      } else {
        res.status(404).json({ message: "not found" });
      }
    } catch (error) {
      res.status(500).json(err);
    }
  },

  listPermission: async (req, res) => {
    try {
      Permission.find((err, data) => {
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

  listRequest: async (req, res) => {
    try {
      data = Requests.find((err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      })
        .populate({
          path: "user",
          populate: {
            path: "permission",
          },
        })
        .populate({
          path: "right",
        });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateRequest: async (req, res) => {
    try {
      const requestId = req.params;
      const request = req.body;
      const date = new Date();

      const ex = await Requests.findByIdAndUpdate(
        { _id: requestId.id },
        { is_approval: request.is_approval, updated_at: date },
        {
          new: true,
        }
      );

      if (request.is_approval) {
        const ex1 = await User.findByIdAndUpdate(
          { _id: ex.user },
          { permission: ex.right },
          {
            new: true,
          }
        );
      } else {
        const ex1 = await User.findByIdAndUpdate(
          { _id: ex.user },
          { permission: "63364d6e2107fe09e49bcc18" },
          {
            new: true,
          }
        );
      }

      res.status(200).json(ex);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteRequest: async (req, res) => {
    try {
      const request = req.params;
      Requests.findByIdAndRemove({ _id: request.id }, (err, data) => {
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
};

module.exports = CompanyProfileController;
