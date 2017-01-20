'use strict';

const egg = require('egg');
const path = require('path');

const EGG_PATH = path.dirname(__dirname);
const startCluster = egg.startCluster;

class AliyunEggApplication extends egg.Application {
  get [Symbol.for('egg#eggPath')]() {
    return EGG_PATH;
  }
}

class AliyunAgent extends egg.Agent {
  get [Symbol.for('egg#eggPath')]() {
    return EGG_PATH;
  }
}

exports.Application = AliyunEggApplication;
exports.Agent = AliyunAgent;
exports.startCluster = function(options, callback) {
  options = options || {};
  options.customEgg = EGG_PATH;
  startCluster(options, callback);
};
