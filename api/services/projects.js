const { Projects, Users } = require("../../db/models");
const { ErrorHandler } = require("../../helpers/error");
const { isValid } = require("mongoose").Types.ObjectId;

const empty = async () => {
  try {
    return await Projects.deleteMany({});
  } catch (error) {
    throw new ErrorHandler(304, error.message);
  }
};

const getAll = async () => {
  try {
    const result = (await Projects.find({}).exec()).map(e =>
      e.toObject({ versionKey: false })
    );
    if (result.length > 0) {
      return result;
    } else {
      throw new ErrorHandler(404, "Empty");
    }
  } catch (error) {
    throw error;
  }
};
//TODO: Handle Database errors
const create = async data => {
  try {
    const userExits = await Users.exists({ _id: data.user_id });
    if (!userExits) throw new ErrorHandler(404, "user does not exist");
    if (!isValid(data.user_id)) throw new ErrorHandler(400, "invalid user_id");
    const projectExists = await Projects.exists(data);
    if (projectExists) {
      throw new ErrorHandler(409, "duplicate project");
    }
    const project = new Projects(data);
    return await project.save();
  } catch (error) {
    // console.log(error.stack);
    throw error;
  }
};

const findById = async _id => {
  try {
    if (!isValid(_id)) throw new ErrorHandler(400, "invalid id");
    const result = await Projects.findById({ _id }).exec();
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
};

const deleteById = async _id => {
  try {
    if (!isValid(_id)) throw new ErrorHandler(400, "invalid id");
    const result = await Projects.findOneAndDelete({ _id });

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
};
const updateById = async ({ _id, data }) => {
  if (!isValid(_id)) throw new ErrorHandler(400, "invalid id");
  try {
    const result = await Projects.findByIdAndUpdate({ _id }, data, {
      new: true
    }).exec();
    if (result) {
      return result.toObject({ versionKey: false });
    } else {
      throw new ErrorHandler(404, "project not found");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  create,
  empty,
  findById,
  deleteById,
  updateById
};
