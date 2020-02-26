const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const routes = require("../api");
const { handleError } = require("../helpers/error");

module.exports = async ({ app }) => {
  app.enable("trust proxy");
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(morgan("dev"));
  app.use(cors());
  app.use("/api", routes());

  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};
