'use strict';

module.exports = (app) => {
  const { router, controller, jwt } = app;
  app.get('/', 'home.index');
  app.resources('users', '/api/users', app.controller.user);
  app.get('/init', app.controller.user.init);
  app.post('/login', app.controller.user.login)

  // app.get('/movice', app.controller.user.movice);
  // app.post('/buy', app.controller.user.buy)
  // app.get('/voice', app.controller.user.voice);

};