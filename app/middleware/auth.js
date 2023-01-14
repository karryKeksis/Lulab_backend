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
    const whiteList = ['/login', '/register', '/graphql'];
    if (whiteList.indexOf(url) !== -1) {
      // 放行
      return next();
    } else {
      // 进行token校验
      // 获取token
      const token = ctx.request.header.authorization;
      console.log("token = ", token)
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
        }
      }
    }
  }
};