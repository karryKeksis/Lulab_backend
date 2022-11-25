/* 'use strict';

*/

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const ProductInfoSchema = new Schema({
    type: {
      type: String,
      unique: true,
      required: false,
      get: v => (v == null ? '' : v),
    },
    poster: {
      type: String,
      unique: false,
      required: false,
      get: v => (v == null ? '' : v),
    },
    paymentWay: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    goodsPrice: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    goodsTime: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    goodsId: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    goodsCategory: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    goodsName: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    goodsBody: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
  });
  return mongoose.model('ProductInfo', ProductInfoSchema);
};
