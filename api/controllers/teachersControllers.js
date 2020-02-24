const { identityService } = require("../services");
const getAll = async (req, res) => {
  const result = await identityService.getAll();
  console.log(result);
  res.send("this is teacher resourse");
};

module.exports = {
  getAll
};
