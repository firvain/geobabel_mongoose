const questionnairesRouter = require("express").Router();
// const guard = require("express-jwt-permissions")();
// const { director } = require("../../../permissions");
const { QuestionnairesControllers } = require("../../controllers");
module.exports = apiRouter => {
  apiRouter.use("/questionnaires", questionnairesRouter);
  questionnairesRouter
    .route("/")
    .get(QuestionnairesControllers.getAll.bind(QuestionnairesControllers))
    .delete(QuestionnairesControllers.empty.bind(QuestionnairesControllers))
    .post(QuestionnairesControllers.create.bind(QuestionnairesControllers));

  questionnairesRouter
    .route("/:_id")
    .get(QuestionnairesControllers.findById.bind(QuestionnairesControllers))
    .patch(QuestionnairesControllers.updateById.bind(QuestionnairesControllers))
    .delete(
      QuestionnairesControllers.deleteById.bind(QuestionnairesControllers)
    );

  apiRouter.use((err, req, res, next) => {
    next(err);
  });
};
