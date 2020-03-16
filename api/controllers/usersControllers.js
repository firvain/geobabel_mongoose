const { UsersService } = require("../services");
const SuperController = require("./SuperController");

class UsersController extends SuperController {
  constructor(service) {
    super(service);
  }
}

module.exports = new UsersController(UsersService);
