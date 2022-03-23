const Joi = require('joi');

exports.PaginatedRequestValidation = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  all: Joi.alternatives(Joi.boolean(), Joi.string()).optional(),
});
