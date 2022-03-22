const { Router } = require('express');
const catsController = require('./cats.controller');

const controllers = [catsController];

module.exports = (app) => {
  controllers.forEach(([path, handler]) => {
    const router = Router();
    handler(router);
    app.use(path, router);
  });
};
