const { model } = require('mongoose');
const { DATABASE_TABLE } = require('../../shared/constants');
const CoffeeSchema = require('../schema/coffee-schema');

module.exports = model(DATABASE_TABLE.COFFEE, CoffeeSchema);
