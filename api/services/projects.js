const { Projects, Users } = require("../../db/models");
const { ErrorHandler } = require("../../helpers/error");
const { isValid } = require("mongoose").Types.ObjectId;
const { ObjectId } = require("mongoose").Types.ObjectId;

const SuperService = require("./SuperService");
class ProjectsService extends SuperService {
  constructor(model, extraModel = Users) {
    super(model);
    this.extraModel = extraModel;
  }
  async create(data) {
    try {
      if (!isValid(data.user_id))
        throw new ErrorHandler(400, "invalid user_id");
      const userExits = await this.extraModel.exists({ _id: data.user_id });
      if (!userExits) throw new ErrorHandler(404, "user does not exist");
      const projectExists = await this.model.exists(data);
      if (projectExists) {
        throw new ErrorHandler(409, "duplicate project");
      }
      const project = new this.model(data);
      return await project.save();
    } catch (error) {
      throw error;
    }
  }
  async findByUserId(user_id, params) {
    const queryString = { user_id: ObjectId(user_id), ...params };
    console.log(queryString);
    try {
      if (!isValid(user_id)) throw new ErrorHandler(400, "invalid user id");
      const result = await this.model.find(queryString).exec();
      if (result && result.length > 0) {
        return result;
      } else {
        throw new ErrorHandler(404, "not found");
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteAllByUserId(user_id) {
    try {
      if (!isValid(user_id)) throw new ErrorHandler(400, "invalid user id");
      const result = await this.model.deleteMany({
        user_id: ObjectId(user_id)
      });

      if (result.deletedCount > 0 && result.ok === 1) {
        return result.deletedCount;
      } else {
        throw new ErrorHandler(404, "user does not have projects");
      }
    } catch (error) {
      throw error;
    }
  }
  async findByUserIdAndProjectId({ user_id, project_id }) {
    try {
      if (!isValid(user_id)) throw new ErrorHandler(400, "invalid user id");
      if (!isValid(project_id))
        throw new ErrorHandler(400, "invalid project id");
      const result = await this.model
        .find({ _id: ObjectId(project_id), user_id: ObjectId(user_id) })
        .exec();
      if (result && result.length > 0) {
        return result;
      } else {
        throw new ErrorHandler(404, "user does not have projects");
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new ProjectsService(Projects, Users);
