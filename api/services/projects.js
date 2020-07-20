const { Projects, Users, Questionnaires } = require("../../db/models");
const { ErrorHandler } = require("../../helpers/error");
const { isValid } = require("mongoose").Types.ObjectId;
const { ObjectId } = require("mongoose").Types.ObjectId;

const SuperService = require("./SuperService");
class ProjectsService extends SuperService {
  constructor(
    model,
    extraModel = Users,
    extraModelQuestionnaires = Questionnaires
  ) {
    super(model);
    this.extraModel = extraModel;
    this.extraModelQuestionnaires = extraModelQuestionnaires;
  }
  async createByUserId(data) {
    // console.log("create the project::", data);
    try {
      if (!isValid(data.project.user_id))
        throw new ErrorHandler(400, "invalid user_id");
      const userExists = await this.extraModel.exists({
        _id: data.project.user_id
      });
      if (!userExists) throw new ErrorHandler(404, "user does not exist");
      const project = new this.model(data.project);
      return await project.save();
    } catch (error) {
      throw error;
    }
  }
  async findByUserId(user_id, params) {
    const queryString = { user_id: ObjectId(user_id), ...params };
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
  async deleteByUserIdAndProjectId({ user_id, project_id }) {
    try {
      if (!isValid(user_id)) throw new ErrorHandler(400, "invalid user id");
      if (!isValid(project_id))
        throw new ErrorHandler(400, "invalid project id");
      try {
        const result = await this.extraModelQuestionnaires.deleteMany({
          project_id: ObjectId(project_id)
        });
        // TODO: what to do with the result?
        try {
          const result = await this.model.findOneAndDelete({ _id: project_id });
          if (result) {
            return result.toObject({ versionKey: false });
          } else {
            throw new ErrorHandler(404, "not found");
          }
        } catch (error) {
          throw error;
        }
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new ProjectsService(Projects, Users);
