'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'role';
const MODEL_NAME = 'Role';

module.exports = {
  Query: {
    latestRole(root, {
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].latestRole(option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
    latestUserRole(root, {
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].latestUserRole(option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
  }
};