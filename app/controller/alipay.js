'use strict';

const fs = require('fs');
const path = require('path');

const AlipaySDK = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;

const Controller = require('egg').Controller;
const utils = require('alipay-mobile');
class AlipayController extends Controller {
  async index() {
    const { ctx } = this;
    const alipaySdk = new AlipaySDK({
      appId: process.env.APP_ID, // 你自己的沙箱黄环境的appId
      privateKey: process.env.PRIVATE_KEY,
      /* fs.readFileSync(
        path.join(__dirname, '../../config/pem/app_private_key.pem'),
        'ascii'
      ), // 私钥*/
      signType: 'RSA2', // 签名类型
      alipayPublicKey: process.env.PUBLIC_KEY,
      /* fs.readFileSync(
        path.join(__dirname, '../../config/pem/alipay_public_key.pem'),
        'ascii'
      ),// 支付宝公钥（不是应用公钥） */
      gateway: process.env.GATEWAY, // 网关地址
      timeout: 5000, // 网关超时时间
      camelcase: true, // 是否把网关返回的下划线 key 转换为驼峰写法
    });
    /**
         * 返回支付链接（PC支付接口）
         */
    const formData = new AlipayFormData();
    formData.setMethod('post');
    // formData.addField('appId', '2021000121658471');
    formData.addField('charset', 'utf-8');
    formData.addField('signType', 'RSA2');
    formData.addField('bizContent', {
      outTradeNo: '1569380127338', // 【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
      productCode: 'FAST_INSTANT_TRADE_PAY', // 【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
      totalAmount: '0.01', // 【必选】订单总金额，精确到小数点后两位
      subject: '会员', // 【必选】 订单标题
      body: '购买会员后可观看所有课程', // 【可选】订单描述
      // timeout_express:"1m"
    });
    /**
         * exec对应参数：
         * method（调用支付宝api）
         * params（api请求的参数（包含“公共请求参数”和“业务参数”））
         * options（validateSign，formData，log）
         */
    /* const result = await alipaySdk.exec('alipay.trade.app.pay', {
         app_id: "2021000121658471",
         format: "JSON",
         charset: "utf-8",
         sign_type: "RSA2",
         //timestamp: "",
         version: "1.0",
         biz_content: {
           outTradeNo: "1569380127321",
           totalAmount: "0.01",
           subject: "test1",
           //time_expire: "",
         }
       },
       { formData });*/
    const result = await alipaySdk.exec(
      'alipay.trade.page.pay',
      {
      },
      { formData }
    );
    console.log(result); // result为可以跳转到支付连接的url
    ctx.body = result;
  }
  async utils() {
    const { ctx } = this;
    const params = {
      memo: 'xxxxx',
      result: {
        alipay_trade_app_pay_response: {
          code: '10000',
          msg: 'Success',
          app_id: '2014072300007148',
          out_trade_no: '081622560194853',
          trade_no: '2016081621001004400236957647',
          total_amount: '9.00',
          seller_id: '2088702849871851',
          charset: 'utf-8',
          timestamp: '2016-10-11 17:43:36',
        },
        sign: 'NGfStJf3i3ooWBuCDIQSumOpaGBcQz+aoAqyGh3W6EqA/gmyPYwLJ2REFijY9XPTApI9YglZyMw+ZMhd3kb0mh4RAXMrb6mekX4Zu8Nf6geOwIa9kLOnw0IMCjxi4abDIfXhxrXyj********',
        sign_type: 'RSA2',
      },
      resultStatus: '9000',
    };
    const result = utils.verifyPayment(params);
    console.log(result); // result为可以跳转到支付连接的url
    ctx.body = result;
  }
}

module.exports = AlipayController;
