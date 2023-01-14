'use strict'

// had enabled by egg
// exports.static = true;

exports.validate = {
  enable: true,
  package: 'egg-validate'
}

exports.graphql = {
  enable: true,
  package: 'egg-graphql'
}

exports.cors = {
  enable: true,
  package: 'egg-cors'
}

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.static = {
  enable: true,
  package: 'egg-static',
}