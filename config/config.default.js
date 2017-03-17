'use strict';

exports.core = {
  name: 'aliyun-egg',
};
exports.alinode = {
  enable: false,
  server: '',
  appid: '',
  secret: '',
};
exports.view = {
  defaultViewEngine: 'nunjucks',
  defaultExtension: '.nj',
  mapping: {
    '.nj': 'nunjucks',
  },
};
