const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-geojson-schema");

const ProjectsSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  duration: {
    from: {
      type: Date,
      default: Date.now
    },
    to: {
      type: Date
    }
  },
  area: {
    type: mongoose.Schema.Types.Feature
  }
});
// ProjectsSchema.pre("save", function(next) {
//   console.log(this.user_id);
//   console.log(mongoose.Types.ObjectId.isValid(this.user_id));
//   next();
// });
module.exports = mongoose.model("projects", ProjectsSchema);
