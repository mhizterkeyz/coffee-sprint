const CoffeeRepository = require('../database/repository/coffee-repository');

module.exports = {
  getPaginatedCoffee(params) {
    return CoffeeRepository.getPaginatedCoffee(params);
  },
};
