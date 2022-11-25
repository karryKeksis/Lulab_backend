
'use strict';

const ResolverHelper = require('../common/resolverHelper');

const CONNECTOR_NAME = 'alipaymobile';
// const MODEL_NAME = 'User';

module.exports = {
  Mutation: {
    alipayOrder(root, {
      orderInput,
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].alipayOrder(orderInput);
    },
  },
  Query: {
    alipayCallback(root, {
      queryInput,
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].alipayCallback(queryInput);
    },
    alipayRefund(root, {
      refundInput,
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].alipayRefund(refundInput);
    },
    alipayOrderInfo(root, {
      orderInfoInput,
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].alipayOrderInfo(orderInfoInput);
    },
    alipayOrderDetail(root, {
      orderDetailInput,
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].alipayOrderDetail(orderDetailInput);
    },
  },
};

