'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {

  // 初始化
  async init() { 
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    console.log("models = ", ctx.model.User)

    // ctx.model.User
    // let res1 = new ctx.model.User({
    //   username: '张三',
    //   password: 123,
    //   roleIds: ['63a27b63cfbed8f8049bcf2b', '63a27b63cfbed8f8049bcf2d']
    // })
    // await res1.save();
    // let res2 = new ctx.model.User({
    //   username: '李四',
    //   password: 123,
    //   roleIds: ['63a27b63cfbed8f8049bcf2d', '63a27b63cfbed8f8049bcf2f']
    // })
    // await res2.save();


    ctx.body = 'hell';

  }

  // 看电影
  async movice() {
    const {
      ctx,
      app
    } = this;
    ctx.body = '看电影';
  }
  // 买东西
  async buy() {
    const {
      ctx,
      app
    } = this;
    ctx.body = '买东西';
  }
  // 听声音
  async voice() {
    const {
      ctx,
      app
    } = this;
    ctx.body = '听声音';
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

      username: data.username,
      password: data.password
    }).populate({
      path: 'roleIds',
      populate: {
        path: 'accessIds'
      }
    }).lean();
    console.log("res111 = ", res)
    const token = app.jwt.sign(res, app.config.jwt.secret);
    // 登录成功
    ctx.body = {
      token,
      res
    };

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

}

module.exports = UserController;