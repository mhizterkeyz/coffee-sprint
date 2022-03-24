const coffeeService = require('../services/coffee-service');
const { HTTP_STATUS } = require('../shared/constants');
const Response = require('../shared/response');
const validate = require('../shared/validate');
const { PaginatedRequestValidation } = require('../shared/validation-schemas');

const coffeeController = (coffeeRoute) => {
  coffeeRoute.get(
    '/',
    validate({ query: PaginatedRequestValidation }),
    async (req, res) => {
      const { data, ...meta } = await coffeeService.getPaginatedCoffee(
        req.params,
      );

      Response.data(res, HTTP_STATUS.OK, 'available coffee', data, meta);
    },
  );

  coffeeRoute.get('/:coffeeId', async (req, res) => {
    const coffee = await coffeeService.getSingleCoffee(req.params.coffeeId);

    Response.data(res, HTTP_STATUS.OK, 'coffee', coffee);
  });
};

module.exports = ['/coffee', coffeeController];
