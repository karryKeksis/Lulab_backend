'use strict';

module.exports = (app) => {
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


};