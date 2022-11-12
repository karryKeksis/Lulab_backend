 'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'levelChange';
const MODEL_NAME = 'User';

module.exports = {
  Mutation: {
    levelUp(root, {
      userInput
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].levelUp(userInput);
    },
    levelDown(root, {
      userInput
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].levelDown(userInput);
    },

  }
};
