const { ErrorHandler } = require("../../helpers/error");
const { isValid } = require("mongoose").Types.ObjectId;
const { ObjectId } = require("mongoose").Types.ObjectId;

module.exports = class SuperService {
  constructor(model) {
    this.model = model;
  }
  async empty() {
    try {
      return await this.model.deleteMany({});
    } catch (error) {
      throw new ErrorHandler(304, error.message);
    }
  }

  async getAll() {
    try {
      const result = (await this.model.find({}).exec()).map(e =>
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
  }
  //TODO: Handle Database errors
  async create(data) {
    try {
      const user = new this.model(data);
      if (await this.model.exists(data)) {
        throw new ErrorHandler(409, "duplicate");
      }
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async findById(_id) {
    try {
      if (!isValid(_id)) throw new ErrorHandler(400, "invalid id");
      const result = await this.model.findById({ _id }).exec();
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

  async deleteById(_id) {
    try {
      if (!isValid(_id)) throw new ErrorHandler(400, "invalid id");
      const result = await this.model.findOneAndDelete({ _id });

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
  async updateById({ _id, data }) {
    if (!isValid(_id)) throw new ErrorHandler(400, "invalid id");
    try {
      const result = await this.model
        .findByIdAndUpdate({ _id }, data, {
          new: true
        })
        .exec();
      if (result) {
        return result.toObject({ versionKey: false });
      } else {
        throw new ErrorHandler(404, "not found");
      }
    } catch (error) {
      throw error;
    }
  }
};
