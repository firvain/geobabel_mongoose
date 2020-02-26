const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserIdentitySchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  role: {
    type: String
  }
});
module.exports = mongoose.model("useridentities", UserIdentitySchema);
