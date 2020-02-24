const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionnaireSchema = new Schema({
  properties: {
    type: String
  },
  questions: {
    type: String
  }
});
module.exports = mongoose.model("questionnaires", QuestionnaireSchema);
