const mongooseDelete = require('mongoose-delete');
const BaseSchema = require('./base-schema');

const UserSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: String,
  password: {
    type: String,
    required: true,
  },
  address: String,
});

UserSchema.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true,
});

module.exports = UserSchema;
