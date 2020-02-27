const projectRouter = require("express").Router();
// const guard = require("express-jwt-permissions")();
// const { director } = require("../../../permissions");
const {
  getAll,
  create,
  empty,
  findById,
  deleteById,
  updateById
} = require("../../controllers").projectsControllers;

module.exports = apiRouter => {
  apiRouter.use("/projects", projectRouter);
  projectRouter
    .route("/")
    .get(getAll)
    .delete(empty)
    .post(create);

  projectRouter
    .route("/:_id")
    .get(findById)
    .patch(updateById)
    .delete(deleteById);

  apiRouter.use((err, req, res, next) => {
    next(err);
  });
};
