
'use strict';

const CONNECTOR_NAME = 'alipaysdk';
// const MODEL_NAME = 'User';

module.exports = {
  Mutation: {
    Alipaysdk(root, {
      alipayInput,
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].Alipaysdk(alipayInput);
    },
  },
};
