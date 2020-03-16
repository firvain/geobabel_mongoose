const { Projects, Users } = require("../../db/models");
const { ErrorHandler } = require("../../helpers/error");
const { isValid } = require("mongoose").Types.ObjectId;
const SuperService = require("./SuperService");
class ProjectsService extends SuperService {
  constructor(model) {
    super(model);
  }
  async create(data) {
    try {
      if (!isValid(data.user_id))
        throw new ErrorHandler(400, "invalid user_id");
      const userExits = await Users.exists({ _id: data.user_id });
      if (!userExits) throw new ErrorHandler(404, "user does not exist");
      const projectExists = await Projects.exists(data);
      if (projectExists) {
        throw new ErrorHandler(409, "duplicate project");
      }
      const project = new Projects(data);
      return await project.save();
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new ProjectsService(Projects);
