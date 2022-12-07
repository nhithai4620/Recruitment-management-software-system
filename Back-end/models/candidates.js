var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectID = require("mongodb").ObjectID;

const candidatesSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
  dob: {
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
  experience: {
    type: Number,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  GPA: {
    type: Number,
    required: false,
  },
  salaryExpected: {
    type: Number,
    required: false,
  },
  process: {
    type: String,
    required: false,
    default: "prepared",
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

let Candidates = (module.exports =
  mongoose.models.Candidates || mongoose.model("Candidates", candidatesSchema));

module.exports = { Candidates };
