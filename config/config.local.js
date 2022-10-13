'use strict';
/** @type Egg.EggPlugin */
module.exports = {
    mongodbConfig: {
        prefix: '',
    },
    security: {
        csrf: {
            enable: false,
        },
        domainWhiteList: ['http://localhost:7001'], // 域白名单
    },
    mongodb: {
        // 单数据库信息配置
        client: {
            // host
            host: 'localhost',
            // 端口号
            port: '7001',
            // 用户名
            user: 'admin',
            // 密码
            password: 'admin',
            // 数据库名
            database: 'admin',
            // 编码（富文本中表情是4个字节，mysql 默认的utf8 彪马最多3个字节）
            //charset: 'utf8mb4',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    }
}