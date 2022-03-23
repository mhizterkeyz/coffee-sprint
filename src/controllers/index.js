const { Router } = require('express');
const coffeeController = require('./coffee-controller');

const controllers = [coffeeController];

module.exports = (app) => {
  controllers.forEach(([path, handler]) => {
    const router = Router();
    handler(router);
    app.use(path, router);
  });
};
