var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectID = require("mongodb").ObjectID;

const ActivitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  timeStart: {
    type: Date,
    required: false,
  },
  timeEnd: {
    type: Date,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  assignees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
  ],
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidates",
      required: false,
    },
  ],

  meetingType: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
    default: 0,
  },
  tag: {
    type: String,
    required: false,
  },
  description: {
    type: String,
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

let Activities = (module.exports =
  mongoose.models.Activities || mongoose.model("Activities", ActivitySchema));

module.exports = { Activities };
