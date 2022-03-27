const merge = require('lodash.merge');
const { isValidObjectId } = require('mongoose');
const userModel = require('../models/user-model');

class UserRepository {
  static authCredentialsExists({ email, phone }) {
    return Promise.all([
      userModel.exists({ email, deleted: { $ne: true } }),
      userModel.exists({ phone, deleted: { $ne: true } }),
    ]);
  }

  static createUser(payload) {
    return userModel.create(payload);
  }

  static getUserByEmailOrPhone(emailOrPhone) {
    return userModel.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });
  }

  static updateUser(user, updates) {
    merge(user, updates);

    return user.save();
  }

  static findUserById(id) {
    if (!isValidObjectId(id)) {
      return null;
    }

    return userModel.findById(id);
  }
}

module.exports = UserRepository;
