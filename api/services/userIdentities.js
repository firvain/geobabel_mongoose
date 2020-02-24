const { UserIdentity } = require("../../db/models");

const getAll = async () => {
  return await UserIdentity.find({}).exec();
};

module.exports = {
  getAll
};
