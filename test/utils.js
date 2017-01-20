'use strict';

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mm = require('egg-mock');
const fixtures = path.join(__dirname, 'fixtures');
const columbusPath = path.join(__dirname, '..');
const logDir = path.join(__dirname, '../logs');

// 全局 restore，防止用例忘记 restore
afterEach(mm.restore);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/**
 * 以单进程模式启动 app
 *
 * @param {String} name app name.
 * @param {Object} options
 *  - {String} [antxpath] - antx path
 * @return {App} app Application object.
 */
exports.createApp = function(name, options) {
  options = options || {};
  const egg = require('..');
  const baseDir = path.join(fixtures, name);
  options.baseDir = baseDir;
  if (!options.customEgg) {
    options.customEgg = path.join(__dirname, '..');
  }
  rimraf.sync(path.join(baseDir, 'logs'));
  return mm.app(options, egg);
};

const clusterApps = [];
// ensure to close App process on test exit.
process.on('exit', function() {
  for (const app of clusterApps) {
    app.close();
  }
});

/**
 * 以 cluster 模式启动 app
 *
 * @param {String} name cluster name.
 * @param {Object} options
 *  - {String} [antxpath] - antx path
 * @return {App} app Application object.
 */
exports.startCluster = function(name, options) {
  options = options || {};
  if (options.customEgg === undefined) {
    options.customEgg = path.join(__dirname, '..');
  }
  if (options.dev === undefined) {
    // 默认单进程模式
    options.dev = true;
  }
  const app = mm.cluster(exports.getFilepath(name), options, columbusPath);
  clusterApps.push(app);
  return app;
};

exports.getFilepath = function(name) {
  return path.join(fixtures, name);
};
