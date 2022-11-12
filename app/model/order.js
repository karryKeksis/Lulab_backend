/*'use strict';

*/

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const moment = require('moment');
    const OrderSchema = new Schema({
      userId: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v,
      },
      userPhone: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v,
      },
      goodsCategory: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v,
      },
      paymentWay: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v,
      },
      timestamp: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v,
      },
      out_trade_no: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v,
      },
      total_amount: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v,
      },
      subject: {
        type: String,
        unique: false,
        required: false,
        default:"",
        get: v => v==null ? "" : v,
      },
      body: {
        type: String,
        unique: false,
        required: false,
        default:"",
        get: v => v==null ? "" : v,
      },  
      orderInfo: {
        type: String,
        unique: false,
        required: false,
        default:"",
        get: v => v==null ? "" : v,
      },
      status: {
        type: String,
        unique: false,
        required: false,
        default:"WAIT_BUYER_PAY",
        get: v => v==null ? "" : v,
      },
      trade_no: {
        type: String,
        unique: false,
        required: false,
        default:"",
        get: v => v==null ? "" : v,
      },
      refundReason: {
        type: String,
        unique: false,
        required: false,
        default:"",
        get: v => v==null ? "" : v,
      },
      refundDescription: {
        type: String,
        unique: false,
        required: false,
        default:"",
        get: v => v==null ? "" : v,
      },
    });
    return mongoose.model('Order', OrderSchema);
  }
  