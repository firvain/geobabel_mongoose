const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
require("mongoose-geojson-schema");

const QuestionnaireSchema = new Schema({
  title: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
    required: true
  },
  creator: {
    email: {
      type: mongoose.SchemaTypes.Email,
      allowBlank: true
    }
  },
  created: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false,
    required: true
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
  locale: { type: String, default: "en" },
  totalTimeCountdownInMinutes: { type: Number, default: 0 },
  pages: [
    {
      id: { type: String, minlength: 1, maxlength: 64 },
      title: { type: String, minlength: 1, maxlength: 64 },
      questions: [
        {
          id: {
            type: String,
            minlength: 1,
            maxlength: 64,
            required: true
          },
          questionType: {
            type: String,
            minlength: 1,
            maxlength: 64,
            required: true
          },
          title: {
            type: String,
            minlength: 1,
            maxlength: 64,
            required: true,
            default: "no title"
          },
          description: {
            type: String,
            minlength: 1,
            default: "no description"
          },
          visible: { type: Boolean, default: true },
          required: { type: Boolean, default: false },
          enabled: { type: Boolean, default: true },
          value: { type: String },
          defaultValue: { type: String },
          correctValue: { type: String },
          timeCountdown: { type: Number, min: 0, default: 0 },
          preloadedData: [
            {
              id: {
                type: String,
                minlength: 1,
                maxlength: 64,
                required: true
              },
              text: { type: String }
            }
          ],
          validationRules: [
            {
              ruleId: {
                type: String,
                minlength: 1,
                maxlength: 64,
                required: true
              },
              type: { type: String, minlength: 1 },
              expression: { type: String, minlength: 1 },
              errorOutput: { type: String, minlength: 1 }
            }
          ],
          horizontalValues: [
            {
              id: { type: String, minlength: 1, maxlength: 64 },
              text: { type: String, minlength: 1 }
            }
          ],
          verticalValues: [
            {
              id: { type: String, minlength: 1, maxlength: 64 },
              text: { type: String, minlength: 1 }
            }
          ],
          multipleButtons: { type: Boolean, default: false },
          buttons: [
            {
              id: {
                type: String,
                minlength: 1,
                maxlength: 64,
                required: true
              },
              label: { type: String },
              geometryType: {
                type: String,
                minlength: 1,
                default: "Point"
              },
              coords: { type: String },
              style: {
                radius: { type: Number, min: 0, default: 1 },
                strkWdth: { type: Number, min: 0, default: 1 },
                strkClr: {
                  type: String,
                  minlength: 1,
                  default: "#000000"
                },
                fllClr: { type: String, minlength: 1, default: "#000000" }
              }
            }
          ],
          style: {
            titleFontSize: { type: Number, min: 1, default: 10 },
            titleFontColor: {
              type: String,
              minlength: 1,
              default: "#000000"
            },
            descriptionFontSize: { type: Number, min: 1, default: 9 },
            descriptionFontColor: {
              type: String,
              minlength: 1,
              default: "#000000"
            },
            titleLocation: { type: String, minlength: 1, default: "top" },
            descriptionLocation: {
              type: String,
              minlength: 1,
              default: "top"
            },
            widthOverride: { type: Number, min: 0 }
          },
          layout: { type: String }
        }
      ]
    }
  ],
  logicRules: [
    {
      ruleId: { type: String, minlength: 1, maxlength: 64, required: true },
      expression: { type: String, minlength: 1 },
      action: { type: String, minlength: 1 }
    }
  ],
  spatialProperties: {
    isTheMapActive: { type: Boolean, required: true },
    mapExtent: { type: Array },
    geojson: { type: mongoose.Schema.Types.Feature },
    wms: { type: String, minlength: 1 },
    basemap: { type: String, minlength: 1 }
  }
});
module.exports = mongoose.model("questionnaires", QuestionnaireSchema);
