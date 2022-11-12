'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
const moment = require('moment');
const fs = require("fs");
const path = require("path");
 
const AlipaySDK = require("alipay-sdk").default;
const AlipayFormData = require("alipay-sdk/lib/form").default;
class AlipaysdkConnector /*extends BasicConnector */{

  constructor(ctx, model){
    this.ctx = ctx;
    //this.model = model;
    this.loader = new DataLoader(
        ids => this.fetch(ids)
    );
  }

  async levelUp(userInput) {
    /*var name0 = await this.ctx.model.LevelChange.create({name:"test1",level:"1"},function(err,docs){});
    await this.ctx.model.LevelChange.create({name:"test2",level:"2"},function(err,docs){});
    await this.ctx.model.LevelChange.create({name:"test3",level:"3"},function(err,docs){});*/
    var levelx = await this.ctx.model.User.findOne({
      name:userInput.name
    },null,function (err, docs) {
            //console.log("docs.level=" + docs.level);
    });
    if(levelx.level == 3){
      return {"status":1,"msg":"您已经是永久会员了，无须续费"}
    }
    if(levelx.level == 2){
      return {"status":1,"msg":"您目前已经是会员了"}
    }
    await this.ctx.model.User.updateOne({
      name:userInput.name
    },{
      $set:{level:2}
    })
    
    return {"status": 0, "msg": "您已升级为会员，充值成功"}
  }
  async Alipaysdk(alipaysdkInput) {
    const { ctx } = this;
 
    const alipaySdk = new AlipaySDK({
      appId: "2021000121658471", // 你自己的沙箱黄环境的appId
      privateKey: fs.readFileSync(
        path.join(__dirname, "../../../config/pem/app_private_key.pem"),
        "ascii"
      ), // 私钥
      signType: "RSA2", // 签名类型
      alipayPublicKey: fs.readFileSync(
        path.join(__dirname, "../../../config/pem/alipay_public_key.pem"),
        "ascii"
      ), // 支付宝公钥（不是应用公钥）
      gateway: "https://openapi.alipaydev.com/gateway.do", // 网关地址
      timeout: 5000, // 网关超时时间
      camelcase: true // 是否把网关返回的下划线 key 转换为驼峰写法
    });
    /**
     * 返回支付链接（PC支付接口）
     */
    const formData = new AlipayFormData();
    formData.setMethod("get");
    formData.addField("appId", "2021000121658471");
    formData.addField("charset", "utf-8");
    formData.addField("signType", "RSA2");
    formData.addField("bizContent", {
      outTradeNo: alipaysdkInput.outTradeNo,// 【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
      productCode: alipaysdkInput.productCode,// 【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
      totalAmount: alipaysdkInput.totalAmount,// 【必选】订单总金额，精确到小数点后两位
      subject: alipaysdkInput.subject,// 【必选】 订单标题
      body: alipaysdkInput.body // 【可选】订单描述
    });
    await this.ctx.model.AlipaySdk.create(
      {
        outTradeNo: alipaysdkInput.outTradeNo,// 【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
        productCode: alipaysdkInput.productCode,// 【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
        totalAmount: alipaysdkInput.totalAmount,// 【必选】订单总金额，精确到小数点后两位
        subject: alipaysdkInput.subject,// 【必选】 订单标题
        body: alipaysdkInput.body // 【可选】订单描述
      }
    );
    /**
     * exec对应参数：
     * method（调用支付宝api）
     * params（api请求的参数（包含“公共请求参数”和“业务参数”））
     * options（validateSign，formData，log）
     */
 
    const result = await alipaySdk.exec(
      "alipay.trade.page.pay",
      {},
      { formData }
    );
    console.log(result); // result为可以跳转到支付连接的url
    ctx.body = result;
    return {"status": 0, "msg": result};
  }
}
module.exports = AlipaysdkConnector;