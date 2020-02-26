const { questionnairesService } = require("../services");

const getAll = async (req, res) => {
  const result = await questionnairesService.getAll();
  res.send(result);
};

const create = async (req, res) => {
  const result = await questionnairesService.create();
  console.log(result);
  res.send("this is a new questionnaire created");
};

module.exports = {
  getAll,
  create
};
