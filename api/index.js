const apiRouter = require("express").Router();
const users = require("./routes/users");
const questionnaires = require("./routes/questionnaires");
const projects = require("./routes/projects");

module.exports = () => {
  apiRouter.get("/status", (req, res) => {
    res.send("status");
  });

  users(apiRouter);
  questionnaires(apiRouter);
  projects(apiRouter);

  apiRouter.use((err, req, res, next) => {
    next(err);
    // if (err.code === "permission_denied") {
    //   res.sendStatus(403);
    // }
  });
  return apiRouter;
};
