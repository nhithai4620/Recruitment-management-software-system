var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const contactsSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
});

let Contacts = (module.exports =
  mongoose.models.Contacts || mongoose.model("Contacts", contactsSchema));

module.exports = { Contacts };
