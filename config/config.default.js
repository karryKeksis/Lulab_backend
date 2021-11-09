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
    },
    proxyworker: {
      port: 10086
    },
    middleware: ['graphql']
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546846389359_709'

  // add your config here
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/test',
      options: {
        useNewUrlParser: true,
      },
    }
  }

  return config
}
