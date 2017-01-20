'use strict';

module.exports = {
  write: true,
  prefix: '^',
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
    'eslint',
    'eslint-config-egg',
    'supertest',
    'ali-oss',
  ],
  exclude: [
    './test/fixtures',
  ],
};
