'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);



    // 解析XML的中间件
    const xmlParseMiddleware = app.middleware.xmlParse();

    // 调用支付_web
    router.get('/aliPay', controller.default.aliPay.pay);
    // 支付回调
    router.get('/aliPay/aliPayReturn', controller.default.aliPay.aliPayReturn);
    // 支付通知(关闭CSRF验证)
    router.post('/aliPay/aliPayNotify', xmlParseMiddleware, controller.default.aliPay.aliPayNotify);
    router.get("/alipay", controller.alipay.index);
    // 路由片段示例 注意相关的中间件，不再config中配置全局的，直接在路由中引入，特别说明下这个xmlParseMiddleware中间件下面会有配置说明
    router.get('/pay/ali', controller.web.pay.ali); // 支付宝支付
    router.get('/pay/ali/refund', controller.web.pay.refund); // 支付宝退款
    router.get('/pay/ali/return', controller.web.pay.aliReturn); // 支付宝支付成功回调
    router.get('/utils', controller.alipay.utils); // 支付宝支付成功回调
    //const xmlParseMiddleware = app.middleware.xmlparse();//可能会用得上
    router.post('/pay/ali/notify', xmlParseMiddleware, controller.web.pay.aliNotify); // 支付成功异步通知 注意关闭csrf验证
};
