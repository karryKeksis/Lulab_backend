'use strict';

const Service = require('egg').Service;
const Alipay = require('alipay-mobile').default; // 这里是一个issue: https://github.com/Luncher/alipay/issues/49

/**
 * 用于微信和支付宝相关的支付服务功能, 此处只展示支付宝代码
 */
class PayService extends Service {
    /* ************************ 支付宝相关服务 ************************ */
    async ali(orderData) {
        const {ctx}= this;
        let createUrl = new Promise(function(resolve, reject){
            //实例化 alipay
            const service = new Alipay(ctx.app.config.pay.ali.options);
            //获取返回的参数
            var result = service.createOrder(orderData)
                resolve(result);
        });
        createUrl.then(
            function(value){
                console.log("result.data是"+value);
            }
        );
        return createUrl;
    }

    async refund(params) {
        const service = new Alipay(ctx.app.config.pay.ali.options);
        //获取返回的参数
        return service.tradeRefund(params);
    }

    // 验证异步通知的数据是否正确 params 是支付宝post给我们服务器的数据
    aliNotify(params) {
        //实例化 alipay
        const service = new Alipay(this.config.pay.ali.options);
        return service.makeNotifyResponse(params);
    }
}

module.exports = PayService;