var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const jobRequisitionSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
    unique: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  jobCategories: {
    type: String,
    required: true,
  },
  jobQuantity: {
    type: Number,
    required: false,
  },
  jobDescriptions: {
    type: String,
    required: false,
  },
  jobRequirements: {
    type: String,
    required: false,
  },
  benefits: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  minSalary: {
    type: String,
    required: false,
  },
  maxSalary: {
    type: String,
    required: false,
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note",
    required: false,
  },
  hired: {
    type: Number,
    required: false,
    default: 0,
  },
  inPipeline: {
    type: Number,
    required: false,
    default: 0,
  },
  dropped: {
    type: Number,
    required: false,
    default: 0,
  },
  is_active: {
    type: Boolean,
    required: true,
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

let JobRequisition = (module.exports =
  mongoose.models.jobRequisition ||
  mongoose.model("jobRequisition", jobRequisitionSchema));

module.exports = { JobRequisition };
