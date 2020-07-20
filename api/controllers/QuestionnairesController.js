const HttpStatus = require("http-status-codes");
const { QuestionnairesService } = require("../services");
const SuperController = require("./SuperController");

class QuestionnairesController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  async findByUserIdAndProjectId(req, res, next) {
    const user_id = req.params._id;
    const project_id = req.params.project_id;
    // console.log(req.params);
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

  async createByUserIdAndProjectId(req, res, next) {
    const data = req.body;
    try {
      const result = await this.service.createByUserIdAndProjectId({
        data
      });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateByUserIdAndProjectId(req, res, next) {
    const data = req.body;
    try {
      const result = await this.service.updateByUserIdAndProjectId({
        data
      });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteByUserIdAndProjectId(req, res, next) {
    const data = req.body;
    try {
      const result = await this.service.deleteByUserIdAndProjectId({
        data
      });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QuestionnairesController(QuestionnairesService);
