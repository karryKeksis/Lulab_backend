// app/middleware/auth.js
const AuthException = require('../exception/auth');
module.exports = name => { // 此处name为 auth(xxx) 的xxx
  return async function auth(ctx, next) {
    // 获取token
    const token = ctx.request.headers.authorization;
    // 通过token获取用户id
    const userId = await ctx.service.jwt.getUserIdFromToken(token);
    // 校验权限
    await checkAuth(userId, ctx);
    await next();
  };
  async function checkAuth (userId, ctx) {
    if (!name) {
      return true;
    }
    // 查询权限是否存在
    const access = await ctx.model.Access.findOne({ where: { api_name: name } });
    if (access === null) {
      return true;
    }
    // 查询用户绑定的角色
    const roles = await ctx.model.userRole.findAll({ attributes: [ 'role_id' ], where: { user_id: userId } });
    const roleIds = roles.map(item => item.role_id);
    if (roleIds.includes(1)) {
      return true;
    }
    // 查询用户是否有权限
    const hasAccess = await ctx.model.roleAccess.findOne({ where: { role_id: roleIds }, access_id: access.id } );
    if (hasAccess === null) {
      throw new AuthException('权限不足', 10002);
    }
  }
};