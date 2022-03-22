const Joi = require('joi');
const validate = require('../shared/validate');

const catsController = (cats) => {
  cats.get(
    '/:type',
    validate({
      query: Joi.object({ name: Joi.string().required() }),
      params: Joi.object({ type: Joi.string().required() }),
    }),
    (req, res) => res.status(200).json({ ...req.query, ...req.params }),
  );
};

module.exports = ['/cats', catsController];
