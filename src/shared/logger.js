const { createLogger, format, transports } = require('winston');
const config = require('./config');

const logger = createLogger({
  level: '',
  format: format.combine(format.timestamp(), format.simple()),
  defaultMeta: {
    app: config().app.slug,
  },
});

logger.add(new transports.Console({ format: format.simple() }));

module.exports = logger;
