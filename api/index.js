const apiRouter = require("express").Router();
// const students = require("./students");
const teachers = require("./routes/teachers");
const lessons = require("./routes/lessons");
module.exports = () => {
  apiRouter.get("/status", (req, res) => {
    res.send("status");
  });
  teachers(apiRouter);
  lessons(apiRouter);
  apiRouter.use((err, req, res, next) => {
    if (err.code === "permission_denied") {
      res.sendStatus(403);
    }
  });
  return apiRouter;
};
