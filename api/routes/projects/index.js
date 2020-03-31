const projectRouter = require("express").Router();
// const guard = require("express-jwt-permissions")();
// const { director } = require("../../../permissions");
const { ProjectsControllers } = require("../../controllers");
module.exports = apiRouter => {
  apiRouter.use("/projects", projectRouter);

  projectRouter
    .route("/")
    //see https://stackoverflow.com/questions/45643005/why-is-this-undefined-in-this-class-method
    .get(ProjectsControllers.getAll.bind(ProjectsControllers))
    .delete(ProjectsControllers.empty.bind(ProjectsControllers))
    .post(ProjectsControllers.create.bind(ProjectsControllers));

  projectRouter
    .route("/:_id")
    .get(ProjectsControllers.findById.bind(ProjectsControllers))
    .patch(ProjectsControllers.updateById.bind(ProjectsControllers))
    .delete(ProjectsControllers.deleteById.bind(ProjectsControllers));

  projectRouter
    .route("/user/:user_id")
    .get(ProjectsControllers.findByUser.bind(ProjectsControllers))
    .patch(ProjectsControllers.updateByUser.bind(ProjectsControllers))
    .delete(ProjectsControllers.deleteByUser.bind(ProjectsControllers));

  apiRouter.use((err, req, res, next) => {
    next(err);
  });
};
