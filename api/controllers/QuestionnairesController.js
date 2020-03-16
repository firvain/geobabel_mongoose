const { QuestionnairesService } = require("../services");
const SuperController = require("./SuperController");

class QuestionnairesController extends SuperController {
  constructor(service) {
    super(service);
  }
}

module.exports = new QuestionnairesController(QuestionnairesService);
