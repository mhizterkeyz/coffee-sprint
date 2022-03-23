const coffeeService = require('../services/coffee-service');
const { HTTP_STATUS } = require('../shared/constants');
const Response = require('../shared/response');
const validate = require('../shared/validate');
const { PaginatedRequestValidation } = require('../shared/validation-schemas');

const coffeeController = (coffee) => {
  coffee.get(
    '/',
    validate({ query: PaginatedRequestValidation }),
    async (req, res) => {
      const { data, ...meta } = await coffeeService.getPaginatedCoffee(
        req.params,
      );

      Response.data(res, HTTP_STATUS.OK, 'available coffee', data, meta);
    },
  );
};

module.exports = ['/coffee', coffeeController];
