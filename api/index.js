const apiRouter = require("express").Router();
const userIdentities = require("./routes/userIdentities");
const questionnaires = require("./routes/questionnaires");

module.exports = () => {
  apiRouter.get("/status", (req, res) => {
    res.send("status");
  });

  userIdentities(apiRouter);
  questionnaires(apiRouter);

  apiRouter.use((err, req, res, next) => {
    next(err);
    // if (err.code === "permission_denied") {
    //   res.sendStatus(403);
    // }
  });
  return apiRouter;
};
