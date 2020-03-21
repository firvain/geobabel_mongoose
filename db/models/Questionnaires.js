const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
require("mongoose-geojson-schema");

const QuestionnaireSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects"
  },
  creator: {
    email: {
      type: mongoose.SchemaTypes.Email,
      allowBlank: true
    }
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false
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
  locale: { type: String },
  totalTimeCountdownInMinutes: { type: Number },
  pages: [
    {
      id: { type: String, minlength: 1, maxlength: 64 },
      rows: [
        {
          id: { type: String, minlength: 1, maxlength: 64 },
          columns: [
            {
              id: { type: String, minlength: 1, maxlength: 64 },
              question: {
                type: Schema.Types.Mixed,
                id: { type: String, minlength: 1, maxlength: 64 },
                questionType: { type: String },
                title: { type: String },
                description: { type: String },
                visible: { type: Boolean },
                required: { type: Boolean },
                enabled: { type: Boolean },
                value: { type: String },
                defaultValue: { type: String },
                correctValue: { type: String },
                timeCountdown: { type: Number },
                preloadedData: [
                  {
                    id: { type: String, minlength: 1, maxlength: 64 },
                    text: { type: String }
                  },
                  {
                    id: { type: String, minlength: 1, maxlength: 64 },
                    text: { type: String }
                  }
                ],
                validationRules: [
                  {
                    ruleId: { type: String, minlength: 1, maxlength: 64 },
                    type: { type: String },
                    expression: { type: String },
                    errorOutput: { type: String }
                  }
                ],
                horizontalValues: [
                  {
                    id: { type: String, minlength: 1, maxlength: 64 },
                    text: { type: String }
                  }
                ],
                verticalValues: [
                  {
                    id: { type: String, minlength: 1, maxlength: 64 },
                    text: { type: String }
                  }
                ],
                multipleButtons: { type: Boolean },
                buttons: [
                  {
                    id: { type: String, minlength: 1, maxlength: 64 },
                    label: { type: String },
                    geometryType: { type: String },
                    coords: { type: String },
                    style: {
                      radius: { type: String },
                      strkWdth: { type: String },
                      strkClr: { type: String },
                      fllClr: { type: String }
                    }
                  }
                ],
                style: {
                  titleFontSize: { type: Number },
                  titleFontColor: { type: String },
                  descriptionFontSize: { type: Number },
                  descriptionFontColor: { type: String },
                  titleLocation: { type: String },
                  descriptionLocation: { type: String },
                  widthOverride: { type: String }
                }
              }
            }
          ]
        }
      ]
    }
  ],
  logicRules: [
    {
      ruleId: { type: String, minlength: 1, maxlength: 64 },
      expression: { type: String },
      action: { type: String }
    }
  ],
  spatialProperties: {
    isTheMapActive: { type: Boolean },
    mapExtent: { type: Array },
    geojson: { type: mongoose.Schema.Types.Feature },
    wms: { type: String },
    basemap: { type: String }
  }
});
module.exports = mongoose.model("questionnaires", QuestionnaireSchema);
