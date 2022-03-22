const mongoose = require('mongoose');
const config = require('../shared/config');
const logger = require('../shared/logger');

module.exports = () => {
  mongoose
    .connect(config().databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      logger.error(`error connecting to database - ${error.message}`);
    });
};
