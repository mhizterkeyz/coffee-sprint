const TokenRepository = require('../database/repository/token-repository');
const Util = require('../shared/util');

module.exports = {
  async createToken(payload = {}) {
    const { token } = payload;
    let _token = token;
    if (!_token) {
      _token = Util.generateRandomString(
        10,
        Util.randomAlphanumeric(),
      ).toUpperCase();
      const tokenExists = await TokenRepository.tokenExists(_token);
      if (tokenExists) {
        return this.createAuthToken.bind(this)(payload);
      }
    }

    return TokenRepository.createToken({ ...payload, token: _token });
  },
};
