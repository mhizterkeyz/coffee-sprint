const { verify } = require('jsonwebtoken');
const moment = require('moment');
const UserRepository = require('../../database/repository/user-repository');
const config = require('../config');
const HttpException = require('../exceptions/http-exception');
const UnauthorizedException = require('../exceptions/unauthorized-exception');

module.exports = () => async (req, _res, next) => {
  try {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    const [, jwt] = token.split('Bearer');
    const { secretKey } = config().jwt;
    const obj = verify(jwt.trim(), secretKey);
    const expired = moment(obj.exp * 1000).isBefore(moment());
    if (expired) {
      throw new UnauthorizedException();
    }

    const user = await UserRepository.findUserById(obj.id);
    if (
      !user ||
      obj.password !== user.password ||
      obj.email !== user.email ||
      obj.phone !== user.phone
    ) {
      throw new UnauthorizedException();
    }

    req.user = user;

    next();
  } catch (error) {
    if (!(error instanceof HttpException)) {
      next(new UnauthorizedException());
      return;
    }

    next(error);
  }
};
