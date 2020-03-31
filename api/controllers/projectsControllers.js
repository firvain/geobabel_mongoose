const HttpStatus = require("http-status-codes");
const { ProjectsService } = require("../services");
const SuperController = require("./SuperController");
class ProjectsController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
  async findByUser(req, res, next) {
    try {
      const result = await this.service.findByUser(req.params.user_id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
  async updateByUser(req, res, next) {
    try {
      const result = await this.service.updateByUser(req.params.user_id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteByUser(req, res, next) {
    try {
      const result = await this.service.deleteByUser(req.params.user_id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectsController(ProjectsService);
