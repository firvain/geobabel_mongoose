const { Users } = require("../../db/models");
const SuperService = require("./SuperService");
class UserService extends SuperService {
  constructor(model) {
    super(model);
  }
}
module.exports = new UserService(Users);
