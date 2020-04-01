const HttpStatus = require("http-status-codes");
module.exports = class SuperController {
  constructor(service) {
    this.service = service;
  }
  async empty(req, res, next) {
    try {
      const { n, ok, deletedCount } = await this.service.empty();
      res.status(HttpStatus.ACCEPTED).json({ n, ok, deletedCount });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      const result = await this.service.getAll(req.query);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const { _id } = await this.service.create(req.body);

      res.status(HttpStatus.OK).json({ _id });
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const result = await this.service.findById(req.params._id);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteById(req, res, next) {
    try {
      const result = await this.service.deleteById(req.params._id);

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
  async updateById(req, res, next) {
    try {
      const result = await this.service.updateById({
        _id: req.params._id,
        data: req.body
      });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
};
