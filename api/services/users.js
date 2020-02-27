const { Users } = require("../../db/models");
const { ErrorHandler } = require("../../helpers/error");
const { isValid } = require("mongoose").Types.ObjectId;
const empty = async () => {
  try {
    return await Users.deleteMany({});
  } catch (error) {
    throw new ErrorHandler(304, error.message);
  }
};

const getAll = async () => {
  try {
    const result = (await Users.find({}).exec()).map(e =>
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
  const user = new Users(data);
  try {
    if (await Users.exists(data)) {
      throw new ErrorHandler(409, "duplicate user");
    }
    return await user.save();
  } catch (error) {
    throw error;
  }
};

const findById = async _id => {
  try {
    if (!isValid(_id)) throw new ErrorHandler(400, "invalid id");
    const result = await Users.findById({ _id }).exec();
    if (result) {
      return result.toObject({
        versionKey: false
      });
    } else {
      throw new ErrorHandler(404, "user not found");
    }
  } catch (error) {
    throw error;
  }
};

const deleteById = async _id => {
  try {
    if (!isValid(_id)) throw new ErrorHandler(400, "invalid id");
    const result = await Users.findOneAndDelete({ _id });

    if (result) {
      return result.toObject({
        versionKey: false
      });
    } else {
      throw new ErrorHandler(404, "user not found");
    }
  } catch (error) {
    throw error;
  }
};
const updateById = async ({ _id, data }) => {
  if (!isValid(_id)) throw new ErrorHandler(400, "invalid id");
  try {
    const result = await Users.findByIdAndUpdate({ _id }, data, {
      new: true
    }).exec();
    if (result) {
      return result.toObject({ versionKey: false });
    } else {
      throw new ErrorHandler(404, "user not found");
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
