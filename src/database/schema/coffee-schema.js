const mongooseDelete = require('mongoose-delete');
const mongoosePaginate = require('mongoose-paginate-v2');
const BaseSchema = require('./base-schema');

const CoffeeSchema = new BaseSchema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
});

CoffeeSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true });
CoffeeSchema.plugin(mongoosePaginate);

module.exports = CoffeeSchema;
