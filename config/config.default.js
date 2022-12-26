/* eslint valid-jsdoc: "off" */

'use strict';
require('dotenv').config();

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1666719296467_4527';

  // add your middleware config here
  config.middleware = [ 'auth', 'graphql' ];


  // graphql
  config.graphql = {
    // 默认访问路由
    // http://127.0.0.1:7001/graphql
    router: '/graphql',
    //   是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // graphQL 路由前的拦截器
    // onPreGraphQL: function* (ctx) {
    // },
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    // onPreGraphiQL: function* (ctx) {
    // },
  };


  config.mongoose = {
    url: process.env.MONGOOSE_URL, // 端口号27021数据库名VietNamVisa
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
  };


  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1'/* '192.168.101.3'*/, // Redis host
      password: '',
      db: 0,
    },
  };


  config.cors = {
    origin: '*', // 跨任何域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 被允许的请求方式
  };

  config.jwt = {
    expire: 7200, // 2小时
    secret: '123456',
    refresh_expire: 259200, // 3天
    refresh_secret: 'b2ce49e4a541068c',
    ignore: [ '/api/registered', '/api/login' ], // 哪些请求不需要认证
    // expiresIn: '24h',
  };


  exports.security = {
    csrf: {
      // 当支付宝异步通知当前服务器时忽略csrf验证
      ignore: ctx => {
        // console.log("____________________________________________________");
        // console.log(ctx.request.url);
        if (ctx.request.url === '/aliPay/aliPayNotify' || ctx.request.url === '/graphql' || ctx.request.url === '/graphql?' || ctx.request.url === '/api/registered' || ctx.request.url === '/api/login') {
          return true;
        }
        return false;
      },
    },
  };

  // 阿里云配置
  config.ali = {
    accessKeyId: process.env.ALI_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
  };


  // 支付宝支付回调地址
  exports.aliPayBasicParams = {
    // 支付成功返回地址
    return_url: process.env.ALIPAY_RETURN_URL,
    // 支付成功异步通知地址
    notify_url: process.env.ALIPAY_NOTIFY_URL,
  };

  config.mongoose = {
    // 本地环境
    client: {
      url: 'mongodb://127.0.0.1:27017/test',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    // 服务器环境
    /* client: {
          url: 'mongodb://127.0.0.1:27017/admin',
          options: {
            user: 'opsAdmin',
            pass: 'newpassword',
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
          },
        }*/

  };


  // 支付相关配置：微信，支付宝
  config.pay = {
    ali: {
      options: {
        app_id: process.env.APP_ID, // 支付宝应用id
        appPrivKeyFile: process.env.PRIVATE_KEY, // 应用私钥 字符串即可，文件需要读取同样是字符串
        alipayPubKeyFile: process.env.PUBLIC_KEY, // 支付宝公钥
      },
      // 注意这里的路由是之前配置好的，后面会有讲到
      basicParams: {
        return_url: process.env.RETURN_URL, // 支付成功返回地址 此处仅作为举例 匹配路由 后期可配置调试环境、测试环境和线上环境 区分不同域名
        notify_url: process.env.NOTIFY_URL, // 支付成功异步通知地址 此处仅作为举例
      },
    },
    // .... 当然这里还可以有其他支付，如微信等
  };


  // 七牛云配置
  config.qiniu = {
    AccessKey: process.env.QINIU_ACCESS_KEY, // 七牛云Access_Key
    SecretKey: process.env.QINIU_SECRET_KEY, // 七牛云SecretKey
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
