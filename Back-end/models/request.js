var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const requestSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  right: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
  },

  is_approval: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    required: false,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

let Requests = (module.exports =
  mongoose.models.Requests || mongoose.model("Requests", requestSchema));

module.exports = { Requests };
