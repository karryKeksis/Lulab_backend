'use strict';

const Controller = require('egg').Controller;

const moment = require('moment');

class PayController extends Controller {
  /* ************************ 支付宝相关 ************************ */

  // 这里是用户扫码之后的回调页面显示，扫码成功后会跳转到(重定向到)商户: /pay/alipay/return 这里
  // 页面上会有一些携带参数，包括cartset,out_trade_no, method, total_amount, sign 等，但不能通过这些信息来更新我们自己数据库的订单，不安全
  // 我们需要用支付宝给我们服务器推送过来的数据，来做更新处理
  async aliReturn() {
    this.ctx.body = '支付成功';
    // 接收异步通知 页面什么的自行处理 TODO
  }

  // 支付成功以后更新订单信息 必须正式上线, 或者起码配置一个测试的公网ip或域名, 用于接收付款成功后，支付宝给我们post的数据
  async aliNotify() {
    const params = this.ctx.request.body; // 接收 支付宝 post 的 XML 数据
    console.log(params);
    // request.Form("out_trade_no")
    const result = await this.service.pay.aliNotify(params); // 进行异步通知的数据验证
    console.log('-------------');
    console.log(result);

    // 校验正确的时候
    if (result.code === '0') {
      if (params.trade_status === 'TRADE_SUCCESS') {
        // 更新订单
      }
    } else {
      // 如果校验失败 理论上要追踪记录一下的，记录至数据库或者存入日志系统
    }
    // Rf1egHvdA3bRKHfGBlQ7AtOwg6dTj0m789BqH9JDQQytbU2AyQECsgsfvIBZYabllnh6NyL17twhQQtyVXH+3sxTanV/2TxvTdjjOv1Riyw4YpPv8ZJZS+8JX4LwwumtJV0gXwGN9UzOxAoU4g5GfJjXet0fYjt4aXucd5zVZGk107a/K1idhLJNboKVX5TtIQYl6Y2ABlnCFSlW/y7mrBujsrNfRd1qMAsT6iCcpWDQghdFo9Is1oFRC4lq1W+iEDthAyPqiC7PX1hjNZndYB0gHeGN/qPxp9Abnfc2i/bZqJQSachksbXe4Bi/HtyiI1Xw72pbbal/vbDGuX3U1g==

  }
}

module.exports = PayController;
