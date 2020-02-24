const expressLoader = require("./express.js");
const Logger = require("./logger.js");
const mongooseLoader = require("./mongoose.js");
module.exports = async ({ expressApp }) => {
  try {
    await mongooseLoader();
    Logger.info("✌️ MongoDB loaded");
    await expressLoader({ app: expressApp });
    Logger.info("✌️ Express loaded");
  } catch (error) {
    throw new Error(error.message);
  }
};
