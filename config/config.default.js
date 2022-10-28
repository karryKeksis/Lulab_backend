'use strict'

module.exports = appInfo => {
  const config = {

    security: {
      csrf: {
        ignore: () => true
      }
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
    proxyworker: {
      port: 10086
    },
    middleware: ['graphql']
    
  }

  config.jwtOpts = {
    secretKey: process.env.JWT_SECRET_KEY,
    expireTime: 7 * 24 * 60 * 60,
  },

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546846389359_709'


  /*config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0
    }
  }
  */

  // add your config here
  config.mongoose = {
    //本地环境
    client: {
      url: 'mongodb://127.0.0.1:27017/test',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
    }
    //服务器环境
    /*client: {
      url: 'mongodb://127.0.0.1:27017/admin',
      options: {
        user: 'opsAdmin',
        pass: 'newpassword',
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      },
    }*/

  }
  config.redisConfig = {
    expireTime: 7200, // jwt、redis过期时间(s)
    updateExpireTime: 1800, // jwt、redis如果用户一直在操作，距离给redis的key续费的时间(s) //30分钟,
    redisKeySecret: '', // redis中key加密处理
  }; 

  return config
}
/*exports.fullQiniu = {
  default: {
    ak: '', // Access Key
    sk: '', // Secret Key
    useCdnDomain: true,
    isLog: true,
  },
  app: true,
  agent: false,

  // 单实例
  // 通过 app.fullQiniu 直接使用实例
  // client: {
  //     zone: '', // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
  //     bucket: '',
  //     baseUrl: null, // 用于拼接已上传文件的完整地址
  // }

  // 多实例
  // clients: {
  //     // 可以通过 app.fullQiniu.get('myImage'), app.fullQiniu.get('myText') 获取实例
  //     myImage: {
  //         zone: '', // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
  //         bucket: '',
  //         baseUrl: null, // 用于拼接已上传文件的完整地址
  //     },
  //     myText: {
  //         zone: '', // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
  //         bucket: '',
  //         baseUrl: null, // 用于拼接已上传文件的完整地址
  //     },
  // },
};
*/
