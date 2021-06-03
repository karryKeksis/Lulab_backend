'use strict';

module.exports = appInfo => {
  const config = {
    keys: appInfo.name + '_1567781006477_509',
    proxyworker: {
      port: 10086,
    },
    middleware: ['error', 'auth', 'clickstream', 'graphql'],
    security: {
      csrf: {
        ignore: () => true,
      },
    },
    jwtOpts: {
      secretKey: process.env.JWT_SECRET_KEY,
      expireTime: 7 * 24 * 60 * 60,
    },
    aliyun: {
      region: process.env.ALIYUN_REGION || 'oss-cn-beijing',
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
      bucket: process.env.ALIYUN_BUCKET || 'community-image-test', // 系统图片
      userBucket: process.env.ALIYUN_USER_BUCKET || 'community-user-image-test', // 用户图片
    },
    appName: 'gugu',
    redis: {
      clients: {
        identifyingCode: {
          port: 6379,
          host: '127.0.0.1',
          password: '',
          db: 0,
        },
        evidence: {
          port: 6379,
          host: '127.0.0.1',
          password: '',
          db: 1,
        },
      },
    },
    clients: {
      GUGU_WECHAT_MINI: {
        APP_ID: process.env.WECHAT_MINI_APP_ID,
        APP_SECRET: process.env.WECHAT_MINI_APP_SECRET
      }
    },
    graphql: {
      // graphiql: true,
      // // graphQL 路由前的拦截器
      // onPreGraphQL: async function (ctx) {
      // },
      // // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
      // onPreGraphiQL: function (ctx) {
      // },
    },
    crypto: {
      key: process.env.ENCRYPT_KEY || 'FnJL7EDzjqWjcaY9',
      iv: process.env.ENCRYPT_IV || 'FnJL7EDzjqWjcaY9'
    },
    error: {
      // 这里使用appInfo.env来判断环境，仅仅在非生产环境下打开堆栈信息，用于调试
      postFormat: (e, { stack, ...rest}) => appInfo.env === 'prod' ? rest: { stack, ...rest}
    }
  };

  return config;
};