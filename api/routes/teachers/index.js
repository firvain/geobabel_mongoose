const teacherRouter = require("express").Router();
const guard = require("express-jwt-permissions")();
const { director } = require("../../../permissions");
const { getAll } = require("../../controllers").teachersControllers;

module.exports = apiRouter => {
  apiRouter.use("/teachers", teacherRouter);
  teacherRouter.get("/", guard.check(director), getAll);
};
