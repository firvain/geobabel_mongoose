const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const routes = require("../api");

module.exports = async ({ app }) => {
  app.enable("trust proxy");
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cors());
  app.use("/api", routes());
};
