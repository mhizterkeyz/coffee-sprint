const { Router } = require('express');
const authController = require('./auth-controller');
const coffeeController = require('./coffee-controller');

const controllers = [coffeeController, authController];

module.exports = (app) => {
  controllers.forEach(([path, handler]) => {
    const router = Router();
    handler(router);
    app.use(path, router);
  });
};
