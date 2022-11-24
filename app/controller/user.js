'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {
  // 注册
  async register() {
    const {
      ctx,
      app
    } = this;
    const {
      name,
      password,
    } = ctx.request.body;

    const res = await ctx.model.User.insertMany([{
      name,
      password,
    }]);
    // console.log("res1111 = ", res)
    ctx.body = 'ok';
  }
  // 登录
  async login() {
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    console.log("data = ", data)
    const res = await ctx.model.User.findOne({
      name: data.name,
      password: data.password
    });
    console.log("res = ", res)
    const token = app.jwt.sign({
      name: data.name,
      role: res.role
    }, app.config.jwt.secret);
    // 登录成功
    ctx.body = token;
  }
  // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
  // 特别注意：token不能直接发送，要在前面加上Bearer字符串和一个空格
  async index() {
    const {
      ctx
    } = this;
    console.log(ctx.state.user);
    ctx.body = {
      code: 201,
      msg: '验证成功'
    };
  }


  async a() {
    const {
      ctx
    } = this;
    ctx.body = {
      code: 200,
      msg: 'a验证成功'
    };
  }

  async b() {
    const {
      ctx
    } = this;
    ctx.body = {
      code: 200,
      msg: 'b验证成功'
    };
  }
}

module.exports = UserController;