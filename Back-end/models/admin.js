var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

let Admin = (module.exports =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema));

module.exports = { Admin };
