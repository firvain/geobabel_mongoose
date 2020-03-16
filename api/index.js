const apiRouter = require("express").Router();
const users = require("./routes/users");
const projects = require("./routes/projects");
const questionnaires = require("./routes/questionnaires");

module.exports = () => {
  apiRouter.get("/status", (req, res) => {
    res.send("status");
  });

  users(apiRouter);
  projects(apiRouter);
  questionnaires(apiRouter);

  apiRouter.use((err, req, res, next) => {
    next(err);
    // if (err.code === "permission_denied") {
    //   res.sendStatus(403);
    // }
  });
  return apiRouter;
};
