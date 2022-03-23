const coffeeModel = require('../models/coffee-model');
const BaseRepository = require('./base-repository');

class CoffeeRepository {
  static getPaginatedCoffee(params) {
    return coffeeModel.paginate(
      {},
      BaseRepository.getPaginateOptions(params, null, { createdAt: -1 }),
    );
  }
}

module.exports = CoffeeRepository;
