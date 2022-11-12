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

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546846389359_709'

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

  
  // 支付相关配置：微信，支付宝
  config.pay = {
    ali: {
        options: {
            app_id: '2021000121658471', // 支付宝应用id
            appPrivKeyFile: 'MIIEpQIBAAKCAQEAscUYSAJVVDjonTc1qhkmIXXHbB3cTJlB5XT4KKCFgtOVdqmMZS51eZS1kDabHpypWgHcPMH1plyBMLkyy43kjP+9AaBWmdvX6C/L6wc7FqA0FAJsRsGUEjUdnDo9EWD042fJ9gq5hoGW/2bvK4j7fub8PdpeMUNVGbkeetzUzCCkCqlftf+2b3SeNLH9S+txk88nn48enlcBoJZIH8lQjkdy/JZSEmP9ZVFxJJKtQWrtrB5LqERor41PeaPUKoC/7OAsYksseHq/gsgZQqBiQJgCQQ6KBx5hbM7V8+rAXaiP/t9fkUPmc9NsD4sSLhpeQKJ7478PfIS+ialIOfJpFQIDAQABAoIBAQCdprUJ50fVEUL5aeTlnLf8JH9emnysUZ3m5/zLys+cXhfGzEX91V3JHOCHrGWUmEp3z/6Iw1oe1xqbIyKw8n0lrgboUlF60USAXSLyo877GcgVlrB/b1zpaMGBswRFTT7gDUNGN+ygJHzMs3SXnzuqJx67m9S8y4HE9i7Zts3g1/accxAyRLMefg+YvfWbscrEmh9czo3zkQ+C75/BDO6fhV6Cg7NKNT8b3nEmj3KJ7X0zGm11lsNq/DWobaeH1hA2PKEA9o1DcOgYIwDFalHtav6n8Sr/C6STRn/irjVEWnBLu//dNhMOatMdVXBHDwB3t8dDjdN3QVNEpCQa+OJhAoGBAOIst5MI16/g0ViPkdGV1Y7RCfIzphq13r1ZVLzfkYT0CvbvUe8oAZKwKGHYC5TYOkoL6CaWbHgCEqOLsQVcG4vfkKNftTpf4DK8MuyZHfIbE5R+J7XtAToVR55YJibBCuFyLW051TO99e/u7FimjvDNxohVMD8thQ2M3euRwaa3AoGBAMk2UAoJWeXpyrYOxz0cfPZKGIcbS88T7AIVt0ut9kFPqACvoatofzM0Krqi9mfUfOWWc87O8brBtQWfouO2jNhhZrCFmblR32NnAVBtIlk1SDCljLakf08qPAq19TFVOed3UoH/zlTRbiC4hrQMQIPLevJ8LT7cfcKCatfi38KTAoGBAJ0Y9FWT0cTfQmniJyXNji2J8v+hcmGhK9qXfu1F2NzhafBFIMMeJaGO7C2yE7FKU4p1JMYQu7zLq8ifUdDoPlX0bpGb+9RVHfP/ltuSKyOsPPhqfAi4W57NgxZwIefPNFCNrxHsFrO+4WHLsayN3EFUnO67RSzM4FseGlLyxfCXAoGBAIvcNtJjIZvQYFkf+Jmf3bSMWHRBIvazkE76rUfricpoBg1EB4pPvmrnDfRhJgmSB6bGZ4UPD7OSxbM8/UpvL4OQYIK+utW39SDxDlbLJR8BDEbUK/UgbmWmo8mGJQK/jNo5dJ5sIw2N7ZDM8sTf51A09ibq7cBOHxQ+9ulNB+AFAoGAQJq/OWDmCUXF7RuJoJwqE+JkXwog1Ez1hU8YlK14bXvqJiqWIzXYkESuN8Ew1d1Ca5sVwcOK/6n7fd6phwvKb1nGLAShtSCOwaFIJpDAuKmXkK2be8RD+UoduCLDsnVq8IRJp6eH86HRMVZIwcIM8cDmgXEFmHfOCSt85HHCxVY=', // 应用私钥 字符串即可，文件需要读取同样是字符串
            alipayPubKeyFile: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkvHko/ylq0hkykr/h6n0RorAmt8AVBqsmJInmIX1Thd7XBNh9U9UgtOp6TQ+i0q+LMM7oAgMBdQJVHpIj4imuFSh4B0EpOrRlT/cXxnk6k+J8CHeXIwKlTaG1cMauB1oFVxdJVKNCCE5xOlfsFG8jqJDsFPneNHio8WcxHqsaga0eBNvH8qsS4JKGquzF8NlvpoObz/lOpntdU9oBDL+4dJPJfsVIY9nXAkBfXOiUCFy2/O4LpKkLckorMNb98uDq5rEa+DFudY59rudolZa8IHiGof2V/ZlIWMSu9XmEamOMlbwm1RC8QY/bB6QPobePKkXWc4PhA1jcpYFibZc1QIDAQAB' // 支付宝公钥
        },
        // 注意这里的路由是之前配置好的，后面会有讲到
        basicParams: {
            return_url: 'http://127.0.0.1:7001/pay/ali/return', // 支付成功返回地址 此处仅作为举例 匹配路由 后期可配置调试环境、测试环境和线上环境 区分不同域名
            notify_url: 'http://127.0.0.1:7001/pay/ali/notify' //支付成功异步通知地址 此处仅作为举例
        }
    },
    // .... 当然这里还可以有其他支付，如微信等
  }

  /*config.security = {
    csrf: {
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        ignore: ctx => {
            // 屏蔽csrf验证的接口或路由
            let arr = [
                // ... 其他url
                '/pay/ali/notify',
            ];
            let flag = false;
            // 进行匹配
            arr.some((item) => {
                if (ctx.request.url === item) {
                    // console.log(item);
                    flag = true;
                    return true;
                }
            });
            return flag;
        },
    },
  }*/

  config.view = {
    mapping:{
      ".html":"ejs"
    }
  }
  
  return config
}
