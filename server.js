require("dotenv").config();
const express = require("express");
// const jwt = require("express-jwt");
// const jwksRsa = require("jwks-rsa");
const Logger = require("./loaders/logger.js");

Logger.stream = {
  write: message => {
    Logger.info(message);
  }
};
// if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
//   throw "Please make sure that auth_config.json is in place and populated";
// }

async function startServer() {
  const app = express();
  // const checkJwt = jwt({
  //   secret: jwksRsa.expressJwtSecret({
  //     cache: true,
  //     rateLimit: true,
  //     jwksRequestsPerMinute: 5,
  //     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  //   }),
  //   audience: process.env.AUTH0_AUDIENCE,
  //   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  //   algorithm: ["RS256"]
  // });
  // app.use(checkJwt);

  // LOADERS
  try {
    await require("./loaders")({ expressApp: app });
  } catch (error) {
    console.log(error.message);
  }

  const PORT = "3001";
  app.listen(PORT, err => {
    if (err) {
      Logger.error(err);
      process.exitCode(1);
    }

    Logger.info(`
  ################################################
  🛡️  Server listening on port: ${PORT} 🛡️
  ################################################
`);
  });
}
startServer();
