const merge = require('lodash.merge');
const tokenModel = require('../models/token-model');

class TokenRepository {
  static tokenExists(token) {
    return tokenModel.exists({
      token,
      deleted: { $ne: true },
    });
  }

  static createToken(payload) {
    return tokenModel.create(payload);
  }

  static getToken(token) {
    return tokenModel.findOne({ token, deleted: { $ne: true } });
  }

  static updateToken(token, updates) {
    merge(token, updates);

    return token.save();
  }
}

module.exports = TokenRepository;
