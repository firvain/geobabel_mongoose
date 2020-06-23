const userRouter = require("express").Router();
const projectRouter = require("express").Router({ mergeParams: true });
const questionnaireRouter = require("express").Router({ mergeParams: true });
// const guard = require("express-jwt-permissions")();
// const { director } = require("../../../permissions");
const {
  UsersControllers,
  ProjectsControllers,
  QuestionnairesControllers
} = require("../../controllers");

module.exports = apiRouter => {
  // apiRouter.use("/projects", projectRouter);
  apiRouter.use("/users", userRouter);
  userRouter
    .route("/")
    .get(UsersControllers.getAll.bind(UsersControllers))
    .delete(UsersControllers.empty.bind(UsersControllers))
    .post(UsersControllers.create.bind(UsersControllers));

  userRouter
    .route("/:_id")
    .get(UsersControllers.findById.bind(UsersControllers))
    .patch(UsersControllers.updateById.bind(UsersControllers))
    .delete(UsersControllers.deleteById.bind(UsersControllers));
  userRouter.use("/:_id/projects", projectRouter);
  projectRouter
    .route("/")
    .get(ProjectsControllers.findByUserId.bind(ProjectsControllers))
    .delete(ProjectsControllers.deleteAllByUserId.bind(ProjectsControllers));
  // .post(ProjectsControllers.create.bind(ProjectsControllers));
  projectRouter
    .route("/:project_id")
    .get(
      ProjectsControllers.findByUserIdAndProjectId.bind(ProjectsControllers)
    );
  userRouter.use(
    "/:_id/projects/:project_id/questionnaires",
    questionnaireRouter
  );
  questionnaireRouter
    .route("/")
    .get(
      QuestionnairesControllers.findByUserIdAndProjectId.bind(
        QuestionnairesControllers
      )
    );
  questionnaireRouter
    .route("/:id")
    .post(
      QuestionnairesControllers.createByUserIdAndProjectId.bind(
        QuestionnairesControllers
      )
    )
    .patch(
      QuestionnairesControllers.updateByUserIdAndProjectId.bind(
        QuestionnairesControllers
      )
    );

  //   .patch(ProjectsControllers.updateByUserId.bind(ProjectsControllers))
  //   .delete(ProjectsControllers.deleteByUserId.bind(ProjectsControllers));

  apiRouter.use((err, req, res, next) => {
    next(err);
  });
};
