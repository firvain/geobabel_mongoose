const db = require("../db");
module.exports = async () => {
  // const a = await db();
  // console.log(a);
  return await db();
};
