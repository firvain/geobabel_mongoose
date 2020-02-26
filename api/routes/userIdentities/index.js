const userIdentityRouter = require("express").Router();
// const guard = require("express-jwt-permissions")();
// const { director } = require("../../../permissions");
const {
  getAll,
  create,
  empty,
  findById,
  deleteById,
  updateById
} = require("../../controllers").userIdentitiesControllers;

module.exports = apiRouter => {
  apiRouter.use("/users", userIdentityRouter);
  userIdentityRouter
    .route("/")
    .get(getAll)
    .delete(empty)
    .post(create);

  userIdentityRouter
    .route("/:_id")
    .get(findById)
    .patch(updateById)
    .delete(deleteById);

  apiRouter.use((err, req, res, next) => {
    next(err);
  });
};
