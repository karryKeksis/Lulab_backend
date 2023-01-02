'use strict';
const moment = require('moment');
/* 作者：黄志远*/

const Alipay = require('alipay-mobile').default;
class AlipayMobileConnector /* extends BasicConnector */ {

  /* 下订单接口：
    1、在数据库中存储预订单
    2、生的签名字符串，传给前端*/

  async alipayOrder(orderInput) {
    const { ctx } = this;
    // let id = this.ctx.request.query.id;
    // console.log('id是'+id);
    /* await this.ctx.model.Order.create({out_trade_no:"1569380127322",all_price:0.02,subject:"支付宝支付"},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127323",all_price:0.03},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127324",all_price:0.04,subject:"支付宝支付"},function(err,docs){});*/

    const orderID =
      (await this.ctx.model.Order.find({}, null /* function(err, docs) {
        console.log(docs);
      }*/).count()) + 1;// 生成订单号
    // console.log("orderResult是"+orderResult+"orderResult.length是");
    /* if (!(orderResult && orderResult.length)) {
        return this.ctx.redirect('/order/confirm?id=' + id); // 定位到当前页面, 或返回错误信息
    }*/
    const info = await this.ctx.model.ProductInfo.find(
      { goodsCategory: orderInput.goodsCategory },
      null
    );// 查找产品数据信息，目前只有课程会员
    console.log(info);
    // console.log("时间戳是"+timestamp);
    const data = {
      subject: info[0].goodsName, // 这里显示什么，同微信支付，看需求
      body: info[0].goodsBody,
      out_trade_no: orderID + '', // 必须是string类型
      total_amount: info[0].goodsPrice,
    };// 这里面有一部分是签名字符串中所需要的特殊的字段（total_amount总金额，其他的有点忘了)，一定要有

    /* let createUrl = new Promise(function(resolve, reject){
      //实例化 alipay*/
    const option0 = ctx.app.config.pay.ali.options;// 支付宝密钥等
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');// 时间戳
    console.log('payTime=' + timestamp);
    option0.timestamp = timestamp;
    const service = new Alipay(option0);
    // 获取返回的参数
    const result = service.createOrder(data);// 用支付宝的接口生成签名字符串及相关信息
    // resolve(result.data);
    // });
    /* createUrl.then(
        function(value){
            console.log("result.data是"+value);
        }
    );*/
    const result1 = await this.ctx.model.Order.create({
      userId: orderInput.userId,
      userPhone: orderInput.userPhone,
      goodsCategory: orderInput.goodsCategory,
      paymentWay: orderInput.paymentWay,
      payTime: option0.timestamp,
      out_trade_no: /* orderInput.out_trade_no*/ orderID + '',
      total_amount: info[0].goodsPrice,
      subject: info[0].goodsName, // 这里显示什么，同微信支付，看需求
      body: info[0].goodsBody,
      orderInfo: result.data + '',
      trade_no: result.trade_no,
    });// 存储预订单相关信息到数据库
    console.log('------------------------------------------------');
    console.log(result1);
    console.log('------------------------------------------------');
    // this.ctx.redirect(url); // 这里跳转到支付宝 我的收银台 进行扫码支付或登录账户支付
    return { orderInfo: result.data + '' };// 返回签名字符串
  }
  /* 订单异步查询*/
  async alipayCallback(queryInput) {
    const { ctx } = this;
    // let id = this.ctx.request.query.id;
    // console.log('id是'+id);
    /* await this.ctx.model.Order.create({out_trade_no:"1569380127322",all_price:0.02,subject:"支付宝支付"},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127323",all_price:0.03},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127324",all_price:0.04,subject:"支付宝支付"},function(err,docs){});*/

    /* var orderID = await this.ctx.model.Order.find(
        {},null, function (err, docs) {
        //console.log(docs);
    }).count()+1;*、
    //console.log("orderResult是"+orderResult+"orderResult.length是");
    /*if (!(orderResult && orderResult.length)) {
        return this.ctx.redirect('/order/confirm?id=' + id); // 定位到当前页面, 或返回错误信息
    }*/
    /* var info = await this.ctx.model.ProductInfo.find(
      {goodsCategory:orderInput.goodsCategory},null, function (err, docs) {
      //console.log(docs);
    });
    console.log(info);
    //console.log("时间戳是"+timestamp);
    var data = {
        subject: info[0].goodsName, // 这里显示什么，同微信支付，看需求
        body:info[0].goodsBody,
        out_trade_no: (orderID+''), // 必须是string类型
        total_amount: info[0].goodsPrice,
    }*/

    /* let createUrl = new Promise(function(resolve, reject){
      //实例化 alipay*/
    const option0 = ctx.app.config.pay.ali.options;
    /* var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
      option0.timestamp = timestamp;*/
    const service = new Alipay(option0);
    // 获取返回的参数
    let result1;
    // const outTradeNo = '1569380127323'
    await service
      .queryOrder({ out_trade_no: queryInput.out_trade_no })
      .then(result => {
        console.log(result);
        result1 = result;
        // assert(result.data.code == '40004', result.message)
      });// 支付宝订单查询
    // resolve(result.data);
    // });
    /* createUrl.then(
        function(value){
            console.log("result.data是"+value);
        }
    );*/

    /* var result1 = await this.ctx.model.Order.create({
      userId:orderInput.userId,
      userPhone:orderInput.userPhone,
      goodsCategory:orderInput.goodsCategory,
      paymentWay:orderInput.paymentWay,
      timestamp: option0.timestamp,
      out_trade_no: (orderID+''),
      total_amount:info[0].goodsPrice,
      subject: info[0].goodsName, // 这里显示什么，同微信支付，看需求
      body:info[0].goodsBody,
      orderInfo:(result.data+'')
    });*/

    console.log('------------------------------------------------');
    console.log('result1是');
    console.log(result1);
    console.log('------------------------------------------------');
    // this.ctx.redirect(url); // 这里跳转到支付宝 我的收银台 进行扫码支付或登录账户支付
    if (result1.data.code === '10000') {
      this.ctx.model.Order.findOne(// 找到原订单
        {
          out_trade_no: queryInput.out_trade_no,
        },
        async function(err, docs) {
          console.log('docs是');
          console.log(docs);
          if (!err) {
            await ctx.model.Order.update(// 更新订单撞款
              {
                out_trade_no: queryInput.out_trade_no,
              },
              { $set: { status: result1.data.trade_status } }
            );
            if (docs.trade_no === '') {
              await ctx.model.Order.update(// 更新trade_no
                {
                  out_trade_no: queryInput.out_trade_no,
                },
                { $set: { trade_no: result1.data.trade_no } }
              );
            }
          }
        }
      );
      return { status: result1.data.trade_status, msg: result1.data.msg };
    } return { status: result1.data.sub_msg, msg: result1.data.msg };
  }
  /* 退款接口*/
  async alipayRefund(refundInput) {
    const { ctx } = this;
    // let id = this.ctx.request.query.id;
    // console.log('id是'+id);
    /* await this.ctx.model.Order.create({out_trade_no:"1569380127322",all_price:0.02,subject:"支付宝支付"},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127323",all_price:0.03},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127324",all_price:0.04,subject:"支付宝支付"},function(err,docs){});*/

    /* var orderID = await this.ctx.model.Order.find(
        {},null, function (err, docs) {
        //console.log(docs);
    }).count()+1;*、
    //console.log("orderResult是"+orderResult+"orderResult.length是");
    /*if (!(orderResult && orderResult.length)) {
        return this.ctx.redirect('/order/confirm?id=' + id); // 定位到当前页面, 或返回错误信息
    }*/
    /* var info = await this.ctx.model.ProductInfo.find(
      {goodsCategory:orderInput.goodsCategory},null, function (err, docs) {
      //console.log(docs);
    });
    console.log(info);
    //console.log("时间戳是"+timestamp);
    var data = {
        subject: info[0].goodsName, // 这里显示什么，同微信支付，看需求
        body:info[0].goodsBody,
        out_trade_no: (orderID+''), // 必须是string类型
        total_amount: info[0].goodsPrice,
    }*/

    /* let createUrl = new Promise(function(resolve, reject){
      //实例化 alipay*/
    const option0 = ctx.app.config.pay.ali.options;
    /* var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
      option0.timestamp = timestamp;*/
    const service = new Alipay(option0);
    // 获取返回的参数
    let result1;
    // const outTradeNo = '1569380127323'

    let result2;
    const info = await this.ctx.model.Order.findOne(
      { out_trade_no: refundInput.out_trade_no },
      null
    );
    await service
      .tradeRefund({
        out_trade_no: refundInput.out_trade_no,
        refund_amount: info.total_amount,
        refund_reason:
          '原因:' +
          refundInput.reason +
          '\n详细描述:' +
          refundInput.description,
      })
      .then(result => {
        console.log('****************');
        console.log(result);
        result1 = result;
        console.log('****************');
      });// 支付宝退款接口
    if (result1.data.fund_change === 'Y') {
      await ctx.model.Order.update(// 退款成功，修改订单状态
        {
          out_trade_no: refundInput.out_trade_no,
        },
        {
          $set: {
            status: 'TRADE_CLOSED',
            refundTime: result1.data.gmt_refund_pay,
            refundReason: refundInput.reason,
            refundDescription: refundInput.description,
          },
        }
      );
      return { status: '已退款', msg: '退款成功' };
    } else if (
      result1.fund_change === 'N' ||
      result1.fund_change === undefined
    ) {
      await service
        .tradeRefundQuery({ // 退款失败或者未接收到数据，查询退款订单信息
          out_request_no: refundInput.out_trade_no,
          out_trade_no: refundInput.out_trade_no,
        })
        .then(result => {
          console.log('++++++++++++++++');
          console.log(result);
          result2 = result;
          console.log('++++++++++++++++');
        });
      if (result2.data.code === '10000') {
        if (result2.data.refund_status === 'REFUND_SUCCESS') {
          return {
            status: result2.data.refund_status,
            msg: '退款失败，因为之前已经成功退款',
          };
        }
        return {
          status: result2.data.refund_status,
          msg: '退款失败，但是成功到查询到了失败原因',
        };
      }
      return {
        status: result2.data.refund_status,
        msg: '退款失败，未查询到失败原因，可能是请求过于频繁或者支付宝后台繁忙',
      };
    }
    return { status: '-1', msg: '订单序列号发生错误' };

    /* var data = {
        code: undefined,
        message: undefined,
        data: {
          code: '10000',
          msg: 'Success',
          buyer_logon_id: 'tcd***@sandbox.com',
          buyer_user_id: '2088622987608378',
          fund_change: 'Y',
          gmt_refund_pay: '2022-11-08 12:17:45',
          out_trade_no: '1569380127331',
          refund_fee: '0.04',
          send_back_fee: '0.00',
          trade_no: '2022110822001408370502361039'
        }
      }
      if(data.data.x === undefined)
        console.log("x undefined");
      else
        console.log("not correct");
      console.log(data.data.fund_change);
      console.log("===================================================");*/
    // resolve(result.data);
    // });
    /* createUrl.then(
        function(value){
            console.log("result.data是"+value);
        }
    );*/

    /* var result1 = await this.ctx.model.Order.create({
      userId:orderInput.userId,
      userPhone:orderInput.userPhone,
      goodsCategory:orderInput.goodsCategory,
      paymentWay:orderInput.paymentWay,
      timestamp: option0.timestamp,
      out_trade_no: (orderID+''),
      total_amount:info[0].goodsPrice,
      subject: info[0].goodsName, // 这里显示什么，同微信支付，看需求
      body:info[0].goodsBody,
      orderInfo:(result.data+'')
    });*/
    /* console.log("------------------------------------------------");
    console.log("result1是");
    console.log(result1);
    console.log("------------------------------------------------");*/
    // this.ctx.redirect(url); // 这里跳转到支付宝 我的收银台 进行扫码支付或登录账户支付
    /* if(result1.data.code == "10000")
      return {"status":result1.data.trade_status,"msg":result1.data.msg};
    else
      return {"status":result1.data.sub_msg,"msg":result1.data.msg};*/
  }
  /* 给前端返回单个订单细节*/
  async alipayOrderDetail(orderDetailInput) {
    console.log('orderID=' + orderDetailInput.orderID);
    const info = await this.ctx.model.Order.findOne(
      {
        out_trade_no: orderDetailInput.orderID,
      },
      null
    );
    if (info.status === 'WAIT_BUYER_PAY') info.tradeStatus = '下单但是未付款';
    else if (info.status === 'TRADE_SUCCESS') info.tradeStatus = '已经成功付款';
    else if (info.status === 'TRADE_CLOSED') { info.tradeStatus = '已退款或未在下单后规定时间内付款'; } else if (info.status === 'TRADE_CLOSED') { info.tradeStatus = '已退款或未在下单后规定时间内付款'; }
    console.log(info);
    delete info.orderInfo;
    return info;
  }
  /* 给前台返回某个用户所有订单细节*/
  async alipayOrderInfo(orderInfoInput) {
    const info = await this.ctx.model.Order.find(
      {
        userId: orderInfoInput.userId,
        userPhone: orderInfoInput.userPhone,
      },
      null
    );
    let i;
    for (i = 0; i < info.length; i++) {
      delete info[i].orderInfo;
      if (info[i].status === 'WAIT_BUYER_PAY') { info[i].tradeStatus = '下单但是未付款'; } else if (info[i].status === 'TRADE_SUCCESS') { info[i].tradeStatus = '已经成功付款'; } else if (info[i].status === 'TRADE_CLOSED') { info[i].tradeStatus = '已退款或未在下单后规定时间内付款'; } else if (info[i].status === 'TRADE_CLOSED') { info[i].tradeStatus = '已退款或未在下单后规定时间内付款'; }
    }
    console.log(info);
    return info;
  }
}
module.exports = AlipayMobileConnector;
