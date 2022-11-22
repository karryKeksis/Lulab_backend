'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
const fs = require("fs");
const path = require("path");
var assert = require('assert');
var moment = require("moment");

const Alipay = require('alipay-mobile').default;
class AlipayMobileConnector /*extends BasicConnector */{

  constructor(ctx, model){
    this.ctx = ctx;
    //this.model = model;
    this.loader = new DataLoader(
        ids => this.fetch(ids)
    );
  }

  async alipayOrder(orderInput) {
    const { ctx } = this;
    //let id = this.ctx.request.query.id;
    //console.log('id是'+id);
    /*await this.ctx.model.Order.create({out_trade_no:"1569380127322",all_price:0.02,subject:"支付宝支付"},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127323",all_price:0.03},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127324",all_price:0.04,subject:"支付宝支付"},function(err,docs){});*/
    
    var orderID = await this.ctx.model.Order.find(
        {},null, function (err, docs) {
        //console.log(docs);
    }).count()+1;
    //console.log("orderResult是"+orderResult+"orderResult.length是");
    /*if (!(orderResult && orderResult.length)) {
        return this.ctx.redirect('/order/confirm?id=' + id); // 定位到当前页面, 或返回错误信息
    }*/
    var info = await this.ctx.model.ProductInfo.find(
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
    }

    /*let createUrl = new Promise(function(resolve, reject){
      //实例化 alipay*/
      var option0 = ctx.app.config.pay.ali.options;
      var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log("payTime="+timestamp);
      option0.timestamp = timestamp;
      const service = new Alipay(option0);
      //获取返回的参数
      var result = service.createOrder(data)
          //resolve(result.data);
    //});
    /*createUrl.then(
        function(value){
            console.log("result.data是"+value);
        }
    );*/
    var result1 = await this.ctx.model.Order.create({
      userId:orderInput.userId,
      userPhone:orderInput.userPhone,
      goodsCategory:orderInput.goodsCategory,
      paymentWay:orderInput.paymentWay,
      payTime: option0.timestamp,
      out_trade_no: /*orderInput.out_trade_no*/(orderID+''),
      total_amount:info[0].goodsPrice,
      subject: info[0].goodsName, // 这里显示什么，同微信支付，看需求
      body:info[0].goodsBody,
      orderInfo:(result.data+''),
      trade_no:result.trade_no
    });
    console.log("------------------------------------------------");
    console.log(result1);
    console.log("------------------------------------------------");
    //this.ctx.redirect(url); // 这里跳转到支付宝 我的收银台 进行扫码支付或登录账户支付
    return {orderInfo:(result.data+'')};
  }
  async alipayCallback(queryInput) {
    const { ctx } = this;
    //let id = this.ctx.request.query.id;
    //console.log('id是'+id);
    /*await this.ctx.model.Order.create({out_trade_no:"1569380127322",all_price:0.02,subject:"支付宝支付"},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127323",all_price:0.03},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127324",all_price:0.04,subject:"支付宝支付"},function(err,docs){});*/
    
    /*var orderID = await this.ctx.model.Order.find(
        {},null, function (err, docs) {
        //console.log(docs);
    }).count()+1;*、
    //console.log("orderResult是"+orderResult+"orderResult.length是");
    /*if (!(orderResult && orderResult.length)) {
        return this.ctx.redirect('/order/confirm?id=' + id); // 定位到当前页面, 或返回错误信息
    }*/
    /*var info = await this.ctx.model.ProductInfo.find(
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

    /*let createUrl = new Promise(function(resolve, reject){
      //实例化 alipay*/
      var option0 = ctx.app.config.pay.ali.options;
      /*var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
      option0.timestamp = timestamp;*/
      const service = new Alipay(option0);
      //获取返回的参数
      var result1;
      //const outTradeNo = '1569380127323'
      await service.queryOrder({ out_trade_no: queryInput.out_trade_no }).then(result => {
        console.log(result);
        result1 = result;
        //assert(result.data.code == '40004', result.message)
      })
          //resolve(result.data);
    //});
    /*createUrl.then(
        function(value){
            console.log("result.data是"+value);
        }
    );*/

    /*var result1 = await this.ctx.model.Order.create({
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
    
    console.log("------------------------------------------------");
    console.log("result1是");
    console.log(result1);
    console.log("------------------------------------------------");
    //this.ctx.redirect(url); // 这里跳转到支付宝 我的收银台 进行扫码支付或登录账户支付
    if(result1.data.code == "10000"){
      this.ctx.model.Order.findOne({
        out_trade_no:queryInput.out_trade_no
      },async function(err,docs){
        console.log("docs是");
        console.log(docs);
        if(!err){
          await ctx.model.Order.update({
            out_trade_no:queryInput.out_trade_no
          },{$set:{status:result1.data.trade_status}});
          if(docs.trade_no === ""){
            await ctx.model.Order.update({
              out_trade_no:queryInput.out_trade_no
            },{$set:{trade_no:result1.data.trade_no}});
          }
        }
      })
      return {"status":result1.data.trade_status,"msg":result1.data.msg};
    }
    else
      return {"status":result1.data.sub_msg,"msg":result1.data.msg};
  }
  async alipayRefund(refundInput){
    const { ctx } = this;
    //let id = this.ctx.request.query.id;
    //console.log('id是'+id);
    /*await this.ctx.model.Order.create({out_trade_no:"1569380127322",all_price:0.02,subject:"支付宝支付"},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127323",all_price:0.03},function(err,docs){});
    await this.ctx.model.Order.create({out_trade_no:"1569380127324",all_price:0.04,subject:"支付宝支付"},function(err,docs){});*/
    
    /*var orderID = await this.ctx.model.Order.find(
        {},null, function (err, docs) {
        //console.log(docs);
    }).count()+1;*、
    //console.log("orderResult是"+orderResult+"orderResult.length是");
    /*if (!(orderResult && orderResult.length)) {
        return this.ctx.redirect('/order/confirm?id=' + id); // 定位到当前页面, 或返回错误信息
    }*/
    /*var info = await this.ctx.model.ProductInfo.find(
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

    /*let createUrl = new Promise(function(resolve, reject){
      //实例化 alipay*/
      var option0 = ctx.app.config.pay.ali.options;
      /*var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
      option0.timestamp = timestamp;*/
      const service = new Alipay(option0);
      //获取返回的参数
      var result1;
      //const outTradeNo = '1569380127323'

      var result1;
      var result2;
      var info = await this.ctx.model.Order.findOne(
        {out_trade_no: refundInput.out_trade_no},null, function (err, docs) {
        //console.log(docs);
      });
      await service.tradeRefund({
        out_trade_no: refundInput.out_trade_no,
        refund_amount: info.total_amount,
        refund_reason:("原因:"+refundInput.reason+"\n详细描述:"+refundInput.description)
      }).then(result => {
        console.log("****************");
        console.log(result);
        result1 = result;
        console.log("****************");
      })
      if(result1.data.fund_change === 'Y'){
        await ctx.model.Order.update({
          out_trade_no:refundInput.out_trade_no
        },{
          $set:{
            status:"TRADE_CLOSED",
            refundTime:result1.data.gmt_refund_pay,
            refundReason:refundInput.reason,
            refundDescription:refundInput.description
        }});
        return {"status":"已退款","msg":"退款成功"};
      }
      else if((result1.fund_change === 'N')||(result1.fund_change === undefined)){
        await service.tradeRefundQuery({
          out_request_no: refundInput.out_trade_no,
          out_trade_no: refundInput.out_trade_no
        }).then(result => {
          console.log("++++++++++++++++");
          console.log(result);
          var data = {
            code: undefined,
            message: undefined,
            data: {
              code: '10000',
              msg: 'Success',
              out_request_no: '1569380127334',
              out_trade_no: '1569380127334',
              refund_amount: '0.01',
              refund_status: 'REFUND_SUCCESS',
              total_amount: '0.01',
              trade_no: '2022110922001408370502362062'
            }
          }
          result2 = result;
          console.log("++++++++++++++++");
        })
        if(result2.data.code == "10000")
          if(result2.data.refund_status == "REFUND_SUCCESS")
            return {"status":result2.data.refund_status,"msg":"退款失败，因为之前已经成功退款"};
          else
            return {"status":result2.data.refund_status,"msg":"退款失败，但是成功到查询到了失败原因"};
        else
          return {"status":result2.data.refund_status,"msg":"退款失败，未查询到失败原因，可能是请求过于频繁或者支付宝后台繁忙"};
      }
      else{
        return {"status":"-1","msg":"订单序列号发生错误"};
      }
      /*var data = {
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
          //resolve(result.data);
    //});
    /*createUrl.then(
        function(value){
            console.log("result.data是"+value);
        }
    );*/

    /*var result1 = await this.ctx.model.Order.create({
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
    /*console.log("------------------------------------------------");
    console.log("result1是");
    console.log(result1);
    console.log("------------------------------------------------");*/
    //this.ctx.redirect(url); // 这里跳转到支付宝 我的收银台 进行扫码支付或登录账户支付
    /*if(result1.data.code == "10000")
      return {"status":result1.data.trade_status,"msg":result1.data.msg};
    else
      return {"status":result1.data.sub_msg,"msg":result1.data.msg};*/
  }


  async alipayOrderDetail(orderDetailInput){
    const { ctx } = this;
    console.log("orderID="+orderDetailInput.orderID);
    var info = await this.ctx.model.Order.findOne({
      out_trade_no:orderDetailInput.orderID
    },null, function (err, docs) {
      //console.log(docs);
    });
      if(info.status === "WAIT_BUYER_PAY")
        info.tradeStatus = "下单但是未付款";
      else if(info.status === "TRADE_SUCCESS")
        info.tradeStatus = "已经成功付款";
      else if(info.status === "TRADE_CLOSED")
        info.tradeStatus = "已退款或未在下单后规定时间内付款";
      else if(info.status === "TRADE_CLOSED")
        info.tradeStatus = "已退款或未在下单后规定时间内付款";
    console.log(info);
    delete info.orderInfo;
    return info;
  }
  async alipayOrderInfo(orderInfoInput){
    const { ctx } = this;
    var info = await this.ctx.model.Order.find({
      userId: orderInfoInput.userId,
      userPhone:orderInfoInput.userPhone
    },null, function (err, docs) {
      //console.log(docs);
    });
    var i;
    for(i=0;i<info.length;i++){
      delete info[i].orderInfo;
      if(info[i].status === "WAIT_BUYER_PAY")
        info[i].tradeStatus = "下单但是未付款";
      else if(info[i].status === "TRADE_SUCCESS")
        info[i].tradeStatus = "已经成功付款";
      else if(info[i].status === "TRADE_CLOSED")
        info[i].tradeStatus = "已退款或未在下单后规定时间内付款";
      else if(info[i].status === "TRADE_CLOSED")
        info[i].tradeStatus = "已退款或未在下单后规定时间内付款";
    }
    console.log(info);
    return info;
  }
}
module.exports = AlipayMobileConnector;