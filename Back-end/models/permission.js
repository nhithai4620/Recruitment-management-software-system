var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const permissionSchema = new Schema({
  role: {
    type: String,
    required: true,
    unique: true,
  },
  desciption: {
    type: String,
    required: false,
  },
});

let Permission = (module.exports =
  mongoose.models.Permission || mongoose.model("Permission", permissionSchema));

module.exports = { Permission };
