const { Projects, Users } = require("../../db/models");
const { ErrorHandler } = require("../../helpers/error");
const { isValid } = require("mongoose").Types.ObjectId;
const { ObjectId } = require("mongoose").Types.ObjectId;

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
  async findByUser(user_id) {
    try {
      console.log("find by user");
      console.log(user_id);
      if (!isValid(user_id)) throw new ErrorHandler(400, "invalid id");
      const result = await Projects.find({ user_id: ObjectId(user_id) }).exec();
      if (result.length > 0) {
        return result;
      } else {
        throw new ErrorHandler(404, "Projects for this user not found");
      }
    } catch (error) {
      throw error;
    }
  }
  async updateByUser(user_id) {
    try {
      if (!isValid(user_id)) throw new ErrorHandler(400, "invalid id");
      const result = await this.model
        .find({ user_id: ObjectId(user_id) })
        .exec();
      if (result) {
        return result.toObject({
          versionKey: false
        });
      } else {
        throw new ErrorHandler(404, "not found");
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteByUser(user_id) {
    try {
      if (!isValid(user_id)) throw new ErrorHandler(400, "invalid id");
      const result = await this.model
        .find({ user_id: ObjectId(user_id) })
        .exec();
      if (result) {
        return result.toObject({
          versionKey: false
        });
      } else {
        throw new ErrorHandler(404, "not found");
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new ProjectsService(Projects);
