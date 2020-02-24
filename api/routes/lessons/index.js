const lessonsRouter = require("express").Router();
const guard = require("express-jwt-permissions")();
const { student } = require("../../../permissions");
module.exports = appRouter => {
  appRouter.use("/lessons", lessonsRouter);
  lessonsRouter.get("/", guard.check(student), (req, res) => {
    res.send("this is lesson resource");
  });
};
