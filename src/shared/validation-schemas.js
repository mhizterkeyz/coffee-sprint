const Joi = require('joi');

exports.PaginatedRequestValidation = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  all: Joi.alternatives(Joi.boolean(), Joi.string()).optional(),
});

exports.SignUpValidation = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().optional(),
  password: Joi.string().required(),
  address: Joi.string().optional(),
});

exports.LoginValidation = Joi.object({
  phoneOrEmail: Joi.string().required(),
  password: Joi.string().required(),
});

exports.ForgotPasswordValidation = Joi.object({
  phoneOrEmail: Joi.string().required(),
});

exports.ResetPasswordValidation = Joi.object({
  resetCode: Joi.string().required(),
  newPassword: Joi.string().required(),
});

exports.ChangePasswordValidation = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});
