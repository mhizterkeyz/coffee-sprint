const app = require('./src/app');
const config = require('./src/shared/config');
const logger = require('./src/shared/logger');

const { port } = config();

app.listen(port, () => {
  logger.info(`app started on port ${port}`);
});
