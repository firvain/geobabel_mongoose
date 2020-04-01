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
  async findByUserAndId(req, res, next) {
    try {
      const result = await this.service.findByUserAndId(
        req.params.user_id,
        req.params._id
      );
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
  async updateByUserAndId(req, res, next) {
    try {
      const result = await this.service.updateByUserAndId(
        req.params.user_id,
        req.params._id,
        req.body
      );
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteByUserAndId(req, res, next) {
    try {
      const result = await this.service.deleteByUserAndId(
        req.params.user_id,
        req.params._id
      );
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectsController(ProjectsService);
