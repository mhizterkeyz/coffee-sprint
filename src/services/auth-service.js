const { compare, hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const moment = require('moment');
const TokenRepository = require('../database/repository/token-repository');
const UserRepository = require('../database/repository/user-repository');
const config = require('../shared/config');
const BadRequestException = require('../shared/exceptions/bad-request-exception');
const UnauthorizedException = require('../shared/exceptions/unauthorized-exception');
const ValidationException = require('../shared/exceptions/validation-exception');
const tokenService = require('./token-service');

module.exports = {
  async signup(payload) {
    const { phone, email, password: plainPassword } = payload;
    const [emailExists, phoneExists] =
      await UserRepository.authCredentialsExists({ email, phone });
    if (emailExists || phoneExists) {
      const errors = {};
      if (emailExists) {
        errors.email = 'Email already exists';
      }
      if (phoneExists) {
        errors.phone = 'Phone already exists';
      }

      throw new ValidationException(errors);
    }

    const password = await hash(plainPassword, 10);
    const user = await UserRepository.createUser({ ...payload, password });
    // TODO: send phone verification text
    // TODO: send email verification email

    return this.getLoggedInUser(user);
  },

  async login(payload) {
    const { phoneOrEmail, password } = payload;
    const user = await UserRepository.getUserByEmailOrPhone(phoneOrEmail);
    const exception = new UnauthorizedException('Invalid credentials');
    if (!user) {
      throw exception;
    }

    const incorrectPassword = !(await compare(password, user.password));
    if (incorrectPassword) {
      throw exception;
    }

    return this.getLoggedInUser(user);
  },

  async changePassword(user, payload) {
    const { oldPassword, newPassword } = payload;
    const incorrectPassword = !(await compare(oldPassword, user.password));
    if (incorrectPassword) {
      throw new ValidationException({ oldPassword: 'Incorrect password' });
    }

    const sameAsOldPassword = await compare(newPassword, user.password);
    if (sameAsOldPassword) {
      throw new ValidationException({
        newPassword: 'New password cannot be the same as old password',
      });
    }

    const password = await hash(newPassword, 10);
    const updatedUser = await UserRepository.updateUser(user, { password });

    return this.getLoggedInUser(updatedUser);
  },

  async sendPasswordResetLink({ phoneOrEmail }) {
    const user = await UserRepository.getUserByEmailOrPhone(phoneOrEmail);
    if (user) {
      /* const { token: resetCode } = */ await tokenService.createToken({
        purpose: 'ResetPassword',
        expiresAt: moment().add(1, 'hour').toDate(),
        meta: { userId: user.id, type: 'resetPassword' },
      });
      // TODO: send password reset text
      // TODO: send password reset email
    }
  },

  async resetPassword(payload) {
    const { resetCode, newPassword } = payload;
    const token = await TokenRepository.getToken(resetCode);
    if (!token || token.isUsed || token.isRevoked) {
      throw new BadRequestException('Invalid reset code');
    }
    if (token.expired) {
      throw new BadRequestException('Reset code expired');
    }

    const userId = token.meta && token.meta.userId;
    const user = await UserRepository.findUserById(userId);
    if (!user) {
      throw new BadRequestException('Invalid reset code');
    }

    const sameAsOldPassword = await compare(newPassword, user.password);
    if (sameAsOldPassword) {
      throw new ValidationException({
        newPassword: 'New password cannot be the same as old password',
      });
    }

    const password = await hash(newPassword, 10);
    await Promise.all([
      UserRepository.updateUser(user, { password }),
      TokenRepository.updateToken(token, { isUsed: true }),
    ]);
  },

  getLoggedInUser(user) {
    const { secretKey, expiresIn } = config().jwt;
    const token = sign(
      {
        id: user.id,
        password: user.password,
        email: user.email,
        phone: user.phone,
      },
      secretKey,
      { expiresIn },
    );

    return { user, token };
  },
};
