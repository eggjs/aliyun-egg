'use strict';

const request = require('supertest');
const mm = require('egg-mock');
const oss = require('ali-oss');
const config = require('./fixtures/apps/oss/config/config.default').oss.client;
const assert = require('assert');
const env = process.env;
const region = env.ALI_SDK_OSS_REGION || 'oss-cn-hangzhou';
const utils = require('./utils');

describe('test/aliyun-egg.test.js', () => {
  describe('render', () => {
    let app;
    before(() => {
      app = utils.createApp('apps/web');
      return app.ready();
    });

    it('should render', () => {
      return request(app.callback())
        .get('/')
        .expect('world')
        .expect(200);
    });
  });

  describe('oss plugin test', () => {
    let app;
    let lastUploadFileName;
    let url;
    before(function* () {
      const ossConfig = {
        accessKeyId: config.accessKeyId,
        accessKeySecret: config.accessKeySecret,
        endpoint: config.endpoint,
        region,
        callbackServer: 'http://d.rockuw.com:4567',
      };
      const store = oss(ossConfig);
      const bucket = 'ali-oss-test-bucket-test99';
      url = 'http://' + bucket + '.' + region + '.aliyuncs.com';
      const result = yield store.putBucket(bucket, region);
      assert(result.bucket === bucket);
      assert(result.res.status === 200);
      app = utils.createApp('apps/oss');
      return app.ready();
    });

    after(function* () {
      if (lastUploadFileName) {
        yield app.oss.delete(lastUploadFileName);
      }
      app.close();
    });

    it('should upload file stream to oss', function* () {
      const result = yield request(app.callback()).get('/uploadtest').expect(200);
      lastUploadFileName = result.body.name;
      const reg = new RegExp('^' + url);
      assert(typeof result.body.name === 'string');
      assert(reg.test(result.body.url));
      assert(result.body.res.status === 200);
    });
  });

  describe('mysql plugin test', () => {
    let app;
    before(() => {
      app = utils.createApp('apps/mysqlapp-new');
      return app.ready();
    });

    it('should query', () => {
      return request(app.callback())
        .get('/')
        .expect(200);
    });
  });
});
