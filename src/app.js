require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const initControllers = require('./controllers');
const initDatabase = require('./database');
const { HTTP_STATUS } = require('./shared/constants');
const HttpException = require('./shared/exceptions/http-exception');
const NotFoundException = require('./shared/exceptions/not-found-exception');
const logger = require('./shared/logger');
const Response = require('./shared/response');

const app = express();

app.use(helmet());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
initDatabase();
initControllers(app);
// JSON not found error
app.use((req) => {
  throw new NotFoundException(`Cannot ${req.method} ${req.path}`);
});
// all exception catcher
app.use((error, req, res, _next) => {
  let response = {
    message: 'An unexpected error occurred',
    code: 'ServerError',
  };
  let status = HTTP_STATUS.SERVER_ERROR;
  if (error instanceof HttpException) {
    [status, response] = error.getHttpResponse();
  } else {
    logger.error(`unexpected error - ${error.message}`, {
      body: req.body,
      params: req.params,
      query: req.query,
      user: req.user,
      headers: req.headers,
    });
  }

  Response.json(res, status, response);
});

module.exports = app;
