/* eslint-disable no-param-reassign */
const merge = require('lodash.merge');
const { Schema } = require('mongoose');

class BaseSchema extends Schema {
  constructor(definition, options) {
    super(
      definition,
      merge(
        {},
        {
          timestamps: true,
          toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
              delete ret._id;
              delete ret.__v;
            },
          },
          toObject: {
            virtuals: true,
          },
        },
        options,
      ),
    );
  }
}

module.exports = BaseSchema;
