module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const OrderSchema = new Schema({
    userId: {
      type: String,
      unique: false,
      required: false,
      get: v => (v == null ? '' : v),
    },
    userPhone: {
      type: String,
      unique: false,
      required: false,
      get: v => (v == null ? '' : v),
    },
    goodsCategory: {
      type: String,
      unique: false,
      required: false,
      get: v => (v == null ? '' : v),
    },
    paymentWay: {
      type: String,
      unique: false,
      required: false,
      get: v => (v == null ? '' : v),
    },
    payTime: {
      type: String,
      unique: false,
      required: false,
      get: v => (v == null ? '' : v),
    },
    refundTime: {
      type: String,
      unique: false,
      required: false,
      get: v => (v == null ? '' : v),
    },
    out_trade_no: {
      type: String,
      unique: false,
      required: false,
      get: v => (v == null ? '' : v),
    },
    total_amount: {
      type: String,
      unique: false,
      required: false,
      get: v => (v == null ? '' : v),
    },
    subject: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    body: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    orderInfo: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    status: {
      type: String,
      unique: false,
      required: false,
      default: 'WAIT_BUYER_PAY',
      get: v => (v == null ? '' : v),
    },
    trade_no: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    refundReason: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
    refundDescription: {
      type: String,
      unique: false,
      required: false,
      default: '',
      get: v => (v == null ? '' : v),
    },
  });
  return mongoose.model('Order', OrderSchema);
};
// module.exports = app => {
//     const mongoose = app.mongoose;
//     const Schema = mongoose.Schema;

//   仕明哥，抱歉啦，因为order这块的模型我也要用所以就把你的注释掉了
//   如果后面需要用的话把前面注释掉然后再把后面这块解除注释就和原来一模一样了
//   const OrderSchema = new Schema({
//     title: { type: String },
//     uid: { type: Schema.Types.ObjectId },
//     goods_id: { type: Schema.Types.ObjectId },
//     description: { type: String },
//     price: { type: Number },
//     orderNumber: { type: Number },
//     methods: { type: Number }, // 支付方式
//     seller_email: { type: String },
//     status: { type: Number, default: 1 },
//   }, {
//     timestamps: true,
//   });

//   const Order = mongoose.model('Order', OrderSchema, 'order');
//   return Order;
// };

//     const Order = mongoose.model('Order', OrderSchema, 'order');
//     return Order;
// };
