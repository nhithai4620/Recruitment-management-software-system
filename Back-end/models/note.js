const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const noteSchema = new Schema({
  note: {
    type: String,
    required: false,
  },
  owner: {
    type: String,
    required: false,
  },
  shared: {
    type: Boolean,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});
let Note = (module.exports =
  mongoose.models.Note || mongoose.model("Note", noteSchema));

module.exports = { Note };
