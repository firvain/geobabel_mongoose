const questionnaireRoute = require("express").Router();
// const guard = require("express-jwt-permissions")();
// const { director } = require("../../../permissions");
const {
  getAll,
  create
} = require("../../controllers").questionnaireControllers;

module.exports = apiRouter => {
  apiRouter.use("/questionnaires", questionnaireRoute);
  questionnaireRoute.get("/", getAll);
  questionnaireRoute.get("/create", create);
};
