const mongooseDelete = require('mongoose-delete');
const BaseSchema = require('./base-schema');

const UserSchema = new BaseSchema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  password: { type: String, required: true },
  address: String,
  phoneVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
});

UserSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true });

module.exports = UserSchema;
