const {
  countReset,
  count
} = require('console');
const jwt = require('jsonwebtoken');

module.exports = options => {
  return async function auth(ctx, next) {

    // 获取当前路由
    const url = ctx.url;
    const method = ctx.method;
    // 配置无需任何权限白名单如注册接口、登录接口，对于这些接口直接放行
<<<<<<< HEAD
    const whiteList = ['/login', '/register', '/graphql'];
=======
    const whiteList = ['/api/login', '/api/register'];
>>>>>>> d0aa9ef303fa9707a4f760212e94acf03781ef0d
    if (whiteList.indexOf(url) !== -1) {
      // 放行
      return next();
    } else {
      // 进行token校验
      // 获取token
      const token = ctx.request.header.authorization;
<<<<<<< HEAD
      console.log("token = ", token)
=======
>>>>>>> d0aa9ef303fa9707a4f760212e94acf03781ef0d
      // 不存在token，报400错误
      if (!token) {
        return ctx.response.body = {
          message: '该用户没有访问权限'
        };
      } else {
        // 从token中获取用户信息
        var retoken = await ctx.service.jwt.reToken(token);
        // 校验token,如果无法通过，则拒绝访问
        var chekToken = await ctx.service.jwt.verifyToken(retoken);
        if (chekToken) {
          var res = await ctx.service.jwt.getUserIdFromToken(retoken);
<<<<<<< HEAD
          const currentAuth = [];
          res.roleIds.forEach((v) => {
            v.accessIds.forEach((item) => {
              currentAuth.push(item);
            })
          })
          // 与远程调用对比
          let hasAuth = false;
          currentAuth.forEach((v) => {
            if (v.url == url && v.action == method) {
=======
          console.log("用户信息 = ", res);
          // 获取登录人角色
          const role = res.role;
          // 定义角色权限映射
          const ROLE_MAP = {
            user: [{
              url: '/api/a',
              method: 'POST'
            }],
            
            vip: [{
              url: '/api/b',
              method: 'POST'
            }]
          }
          // 获取当前角色权限
          let currentAuth = ROLE_MAP[role];
          // 与远程调用对比
          let hasAuth = false;
          currentAuth.forEach((v) => {
            if (v.url == url && v.method == method) {
>>>>>>> d0aa9ef303fa9707a4f760212e94acf03781ef0d
              hasAuth = true;
            }
          })
          if (hasAuth) {
            // 有权限放行
            return next();
          } else {
            // 无权限进行拦截
            return ctx.response.body = {
              message: '该用户没有访问权限'
            };
          }
<<<<<<< HEAD
        }
      }
=======




        }

      }

>>>>>>> d0aa9ef303fa9707a4f760212e94acf03781ef0d
    }
  }
};