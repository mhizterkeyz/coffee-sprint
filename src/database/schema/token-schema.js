const moment = require('moment');
const { SchemaTypes } = require('mongoose');
const BaseSchema = require('./base-schema');

const TokenSchema = new BaseSchema({
  token: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
  isRevoked: { type: Boolean, default: false },
  expiresAt: Date,
  meta: SchemaTypes.Mixed,
  purpose: String,
});

TokenSchema.virtual('expired').get(function isTokenExpired() {
  const $this = this;

  return $this.expiresAt && moment().isAfter($this.expiresAt);
});

module.exports = TokenSchema;
