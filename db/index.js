const mongoose = require("mongoose");
const db = async function() {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    return connection.connection.db;
  } catch (error) {
    throw new Error(error.reason.message);
  }
};
module.exports = db;
