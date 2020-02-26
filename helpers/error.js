const HttpStatus = require("http-status-codes");

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
const handleError = (err, res) => {
  const { statusCode, message } = err;
  switch (statusCode) {
    case 304:
      res.status(HttpStatus.NOT_MODIFIED).send({
        code: HttpStatus.getStatusCode("Not Modified"),
        error: message
      });
      break;
    case 400:
      res.status(HttpStatus.BAD_REQUEST).send({
        code: HttpStatus.getStatusCode("Bad Request"),
        error: message
      });
      break;
    case 404:
      res.status(HttpStatus.NOT_FOUND).send({
        code: HttpStatus.getStatusCode("Not Found"),
        error: message
      });
      break;
    case 409:
      res.status(HttpStatus.CONFLICT).send({
        code: HttpStatus.getStatusCode("Conflict"),
        error: message
      });
      break;

    default:
      res.status(500).send({
        code: HttpStatus.getStatusCode("Server Error"),
        error: message
      });
      break;
  }
};
module.exports = {
  ErrorHandler,
  handleError
};
