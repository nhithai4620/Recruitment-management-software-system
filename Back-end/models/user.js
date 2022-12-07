var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectID = require("mongodb").ObjectID;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contacts",
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  jobTitle: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobRequisition",
      required: false,
    },
  ],
  dob: {
    type: String,
    required: false,
  },
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
    default: ObjectID("63364d6e2107fe09e49bcc18"),
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note",
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tags",
    required: false,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

let User = (module.exports =
  mongoose.models.Users || mongoose.model("Users", userSchema));

module.exports = { User };
