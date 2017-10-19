'use strict';

module.exports = {
  write: true,
  prefix: '^',
  plugin: 'autod-egg',
  test: [
    'test',
    'benchmark',
  ],
  dep: [
    'egg',
    'egg-view-nunjucks',
    'egg-alinode',
    'egg-mysql',
    'egg-oss',
  ],
  devdep: [
    'egg-bin',
    'autod',
    'autod-egg',
    'eslint',
    'eslint-config-egg',
  ],
  exclude: [
    './test/fixtures',
  ],
};
