const { projectsService } = require("../services");
const HttpStatus = require("http-status-codes");
const empty = async (req, res, next) => {
  try {
    await projectsService.empty();
    res.status(HttpStatus.ACCEPTED).json("Deleted all!");
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const result = await projectsService.getAll();
    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const { _id } = await projectsService.create(req.body);

    res.status(HttpStatus.OK).json({ _id });
  } catch (error) {
    next(error);
  }
};
const findById = async (req, res, next) => {
  try {
    const result = await projectsService.findById(req.params._id);
    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const result = await projectsService.deleteById(req.params._id);

    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    const result = await projectsService.updateById({
      _id: req.params._id,
      data: req.body
    });
    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  empty,
  findById,
  deleteById,
  updateById
};
