const HttpStatus = require("http-status-codes");
const { ProjectsService } = require("../services");
const SuperController = require("./SuperController");
class ProjectsController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
  async findByUserId(req, res, next) {
    try {
      const result = await this.service.findByUserId(req.params._id, req.query);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllByUserId(req, res, next) {
    try {
      const result = await this.service.deleteAllByUserId(req.params._id);
      res.status(HttpStatus.OK).json(`deleted ${result} records`);
    } catch (error) {
      next(error);
    }
  }
  async findByUserIdAndProjectId(req, res, next) {
    const user_id = req.params._id;
    const project_id = req.params.project_id;
    console.log(req.params);
    try {
      const result = await this.service.findByUserIdAndProjectId({
        user_id,
        project_id
      });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectsController(ProjectsService);
