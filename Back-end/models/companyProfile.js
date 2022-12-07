var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const companyProfileSchema = new Schema({
  logo: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  timeZone: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contacts",
  },
});

let CompanyProfile = (module.exports =
  mongoose.models.CompanyProfile ||
  mongoose.model("CompanyProfile", companyProfileSchema));

module.exports = { CompanyProfile };
