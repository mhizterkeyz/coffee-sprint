const { model } = require('mongoose');
const { DATABASE_TABLE } = require('../../shared/constants');
const UserSchema = require('../schema/user-schema');

module.exports = model(DATABASE_TABLE.USER, UserSchema);
