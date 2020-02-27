const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  auth_user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  role: {
    type: String
  }
});
module.exports = mongoose.model("users", UsersSchema);
