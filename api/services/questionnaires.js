const { Questionnaires } = require("../../db/models");

const getAll = async () => {
  return await Questionnaires.find({}).exec();
};

const create = async () => {
  return await Questionnaires.create({
    properties: "2",
    questions: "question_id: 2"
  });
};

module.exports = {
  getAll,
  create
};
