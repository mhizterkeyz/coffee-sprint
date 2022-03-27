const authService = require('../services/auth-service');
const { HTTP_STATUS } = require('../shared/constants');
const authGuard = require('../shared/middleware/auth-guard');
const Response = require('../shared/response');
const validate = require('../shared/validate');
const {
  SignUpValidation,
  LoginValidation,
  ForgotPasswordValidation,
  ResetPasswordValidation,
  ChangePasswordValidation,
} = require('../shared/validation-schemas');
const { nextError } = require('./controller-utils');

const authController = (authRoute) => {
  authRoute.post(
    '/signup',
    validate({ body: SignUpValidation }),
    nextError(async (req, res) => {
      const loggedInUser = await authService.signup(req.body);

      Response.data(
        res,
        HTTP_STATUS.CREATED,
        'signup successful',
        loggedInUser,
      );
    }),
  );

  authRoute.post(
    '/login',
    validate({ body: LoginValidation }),
    nextError(async (req, res) => {
      const loggedInUser = await authService.login(req.body);

      Response.data(res, HTTP_STATUS.OK, 'login successful', loggedInUser);
    }),
  );

  authRoute.post(
    '/forgot-password',
    validate({ body: ForgotPasswordValidation }),
    nextError(async (req, res) => {
      await authService.sendPasswordResetLink(req.body);

      Response.data(res, HTTP_STATUS.OK, 'password reset link sent');
    }),
  );

  authRoute.post(
    '/reset-password',
    validate({ body: ResetPasswordValidation }),
    nextError(async (req, res) => {
      await authService.resetPassword(req.body);

      Response.data(res, HTTP_STATUS.OK, 'password reset successful');
    }),
  );

  authRoute.post(
    '/change-password',
    authGuard(),
    validate({ body: ChangePasswordValidation }),
    nextError(async (req, res) => {
      const loggedInUser = await authService.changePassword(req.user, req.body);

      Response.data(
        res,
        HTTP_STATUS.OK,
        'password change successful',
        loggedInUser,
      );
    }),
  );
};
module.exports = ['/auth', authController];
