const coffeeModel = require('../models/coffee-model');
const BaseRepository = require('./base-repository');

class CoffeeRepository {
  static getPaginatedCoffee(params) {
    return coffeeModel.paginate(
      { deleted: { $ne: true } },
      BaseRepository.getPaginateOptions(params, null, { createdAt: -1 }),
    );
  }

  static getSingleCoffee(_id) {
    return coffeeModel.findOne({ _id });
  }
}

module.exports = CoffeeRepository;
