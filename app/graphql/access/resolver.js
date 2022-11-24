'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'access';
const MODEL_NAME = 'Access';

module.exports = {
  Query: {
    latestAccess(root, {
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].latestAccess(option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
  }
};