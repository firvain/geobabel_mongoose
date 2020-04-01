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
      if (!isValid(user_id)) throw new ErrorHandler(400, "invalid user id");
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
  async findByUserAndId(user_id, _id) {
    try {
      if (!isValid(user_id)) throw new ErrorHandler(400, "invalid user id");
      const result = await Projects.find({
        _id,
        user_id: ObjectId(user_id)
      }).exec();
      if (result.length > 0) {
        return result;
      } else {
        throw new ErrorHandler(404, "Projects for this user not found");
      }
    } catch (error) {
      throw error;
    }
  }
  async updateByUserAndId(user_id, _id, data) {
    if (!isValid(_id)) throw new ErrorHandler(400, "invalid project id");
    if (!isValid(user_id)) throw new ErrorHandler(400, "invalid user id");
    try {
      const result = await this.model
        .findOneAndUpdate(
          { _id, user_id: ObjectId(user_id) },
          { $set: data },
          {
            new: true
          }
        )
        .exec();
      if (result) {
        return result.toObject({ versionKey: false });
      } else {
        throw new ErrorHandler(404, "project not found");
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteByUserAndId(user_id, _id) {
    if (!isValid(_id)) throw new ErrorHandler(400, "invalid project id");
    if (!isValid(user_id)) throw new ErrorHandler(400, "invalid user id");
    try {
      const result = await this.model.findOneAndDelete({
        _id,
        user_id: ObjectId(user_id)
      });

      if (result) {
        return result.toObject({
          versionKey: false
        });
      } else {
        throw new ErrorHandler(404, "project not found");
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new ProjectsService(Projects);
