'use strict';

module.exports = function(app) {
  app.get('/home', app.controller.home.home);
  app.get('/home2', app.controller.home.home2);
};
