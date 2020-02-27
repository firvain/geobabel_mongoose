const { usersService } = require("../services");
const HttpStatus = require("http-status-codes");
const empty = async (req, res, next) => {
  try {
    await usersService.empty();
    res.status(HttpStatus.ACCEPTED).json("Deleted all!");
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const result = await usersService.getAll();
    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const { _id } = await usersService.create(req.body);
    res.status(HttpStatus.OK).json({ _id });
  } catch (error) {
    next(error);
  }
};
const findById = async (req, res, next) => {
  try {
    const result = await usersService.findById(req.params._id);
    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const result = await usersService.deleteById(req.params._id);

    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    const result = await usersService.updateById({
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
