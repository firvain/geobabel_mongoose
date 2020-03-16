const { Questionnaires } = require("../../db/models");
const SuperService = require("./SuperService");
class QuestionnairesService extends SuperService {
  constructor(model) {
    super(model);
  }
}
module.exports = new QuestionnairesService(Questionnaires);
