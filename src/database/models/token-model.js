const { model } = require('mongoose');
const { DATABASE_TABLE } = require('../../shared/constants');
const TokenSchema = require('../schema/token-schema');

module.exports = model(DATABASE_TABLE.TOKEN, TokenSchema);
