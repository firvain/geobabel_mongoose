const { ProjectsService } = require("../services");
const SuperController = require("./SuperController");
class ProjectsController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
}

module.exports = new ProjectsController(ProjectsService);
