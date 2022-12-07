const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
});
let Tags = (module.exports =
  mongoose.models.Tags || mongoose.model("Tags", tagSchema));

module.exports = { Tags };
