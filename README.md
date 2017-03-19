aliyun-egg
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/aliyun-egg.svg?style=flat-square
[npm-url]: https://npmjs.org/package/aliyun-egg
[travis-image]: https://img.shields.io/travis/alibaba/aliyun-egg.svg?style=flat-square
[travis-url]: https://travis-ci.org/alibaba/aliyun-egg
[codecov-image]: https://codecov.io/github/alibaba/aliyun-egg/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/alibaba/aliyun-egg?branch=master
[david-image]: https://img.shields.io/david/alibaba/aliyun-egg.svg?style=flat-square
[david-url]: https://david-dm.org/alibaba/aliyun-egg
[download-image]: https://img.shields.io/npm/dm/aliyun-egg.svg?style=flat-square
[download-url]: https://npmjs.org/package/aliyun-egg

Egg framework for Aliyun.

## Requirement

- node >= 4.0.0

## Installation

```bash
$ npm install aliyun-egg --save
```

## Usage

Aliyun egg is a framework for nodejs web applation deployed on Aliyun and related services. It has built-in plugins to support Aliyun `RDS`, `OSS` and `Alinode`.

### Use RDS

First you should visit https://cn.aliyun.com/product/rds/mysql?spm=a21gt.99266.416540.38.qyVigh for more detail, and config in `config/config.default.js`.

```js
// config/config.${env}.js
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'mysql.com',
    // 端口号
    port: '3306',
    // 用户名
    user: 'test_user',
    // 密码
    password: 'test_password',
    // 数据库名
    database: 'test',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
```

### Use OSS

First you should visit https://cn.aliyun.com/product/oss?spm=a21gt.99266.416540.51.qyVigh for more detail, and config in `config/config.default.js`.

```js

exports.oss = {
  client: {
    accessKeyId: 'your access key',
    accessKeySecret: 'your access secret',
    bucket: 'your bucket name',
    endpoint: 'oss-cn-hongkong.aliyun.com',
    timeout: '60s',
  },
};

```

### Use Alinode

First you should visit https://alinode.aliyun.com/ for more detail, and config in `config/config.default.js`.

```js

exports.alinode = {
  appid: 'my app id',
  secret: 'my app secret',
};

```

### Example

For example you can refer to [aliyun]https://github.com/eggjs/egg-showcase-aliyun-blog


## License

[MIT](LICENSE.txt)
