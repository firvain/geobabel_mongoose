const userRouter = require("express").Router();
// const guard = require("express-jwt-permissions")();
// const { director } = require("../../../permissions");
const {
  getAll,
  create,
  empty,
  findById,
  deleteById,
  updateById
} = require("../../controllers").usersControllers;

module.exports = apiRouter => {
  apiRouter.use("/users", userRouter);
  userRouter
    .route("/")
    .get(getAll)
    .delete(empty)
    .post(create);

  userRouter
    .route("/:_id")
    .get(findById)
    .patch(updateById)
    .delete(deleteById);

  apiRouter.use((err, req, res, next) => {
    next(err);
  });
};
