const userRouter = require("express").Router();
// const guard = require("express-jwt-permissions")();
// const { director } = require("../../../permissions");
const { UsersControllers } = require("../../controllers");

module.exports = apiRouter => {
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

  apiRouter.use((err, req, res, next) => {
    next(err);
  });
};
