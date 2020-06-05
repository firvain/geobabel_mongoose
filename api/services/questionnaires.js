const { Questionnaires, Projects, Users } = require("../../db/models");
const { ErrorHandler } = require("../../helpers/error");
const { isValid } = require("mongoose").Types.ObjectId;
const { ObjectId } = require("mongoose").Types.ObjectId;
const SuperService = require("./SuperService");

class QuestionnairesService extends SuperService {
  constructor(model, extraModel_user, extraModel_project) {
    super(model);
    this.extraModel_user = extraModel_user;
    this.extraModel_project = extraModel_project;
  }
  async findByUserIdAndProjectId({ user_id, project_id }) {
    console.log(user_id, project_id);
    try {
      if (!isValid(user_id)) throw new ErrorHandler(400, "invalid user id");
      if (!isValid(project_id))
        throw new ErrorHandler(400, "invalid project id");
      const userExists = await this.extraModel_user.exists({ _id: user_id });
      if (!userExists) throw new ErrorHandler(404, "user does not exist");
      const projectExists = await this.extraModel_project.exists({
        _id: project_id
      });
      if (!projectExists) throw new ErrorHandler(404, "project does not exist");

      const result = await this.model
        .find({ project_id: ObjectId(project_id), user_id: ObjectId(user_id) })
        .exec();
      if (result && result.length > 0) {
        return result;
      } else {
        throw new ErrorHandler(
          404,
          "user does not have questionnaires in this project"
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new QuestionnairesService(Questionnaires, Users, Projects);
