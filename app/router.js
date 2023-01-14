'use strict';

module.exports = (app) => {
<<<<<<< HEAD
  const { router, controller, jwt } = app;
  app.get('/', 'home.index');
  app.resources('users', '/api/users', app.controller.user);
  app.get('/init', app.controller.user.init);
  app.post('/login', app.controller.user.login)

  app.get('/movice', app.controller.user.movice);
  app.post('/buy', app.controller.user.buy)
  app.get('/voice', app.controller.user.voice);
=======
  const {
    router,
    controller,
    jwt
  } = app;
  app.get('/', 'home.index');
  app.resources('users', '/api/users', app.controller.user);
  // 定义注册路由

  // 定义登录路由
  app.post('/api/login', app.controller.user.login);
  // 定义注册接口
  app.post('/api/register', app.controller.user.register);
  // 其他有权限接口a
  app.post('/api/a', app.controller.user.a);
  // 无接口权限b
  app.post('/api/b', app.controller.user.b);

>>>>>>> d0aa9ef303fa9707a4f760212e94acf03781ef0d

};