'use strict';

const mm = require('egg-mock');
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
    afterEach(mm.restore);
    after(() => app.close());

    it('should render', () => {
      return app.httpRequest()
        .get('/home')
        .expect('world')
        .expect(200);
    });
    it('should render by default template nunjucks', () => {
      return app.httpRequest()
        .get('/home2')
        .expect('world2')
        .expect(200);
    });
  });

  describe('oss plugin test', () => {
    let app;
    let lastUploadFileName;
    const bucket = 'ali-oss-test-bucket-test99';
    const url = 'http://' + bucket + '.' + region + '.aliyuncs.com';
    before(function* () {
      app = utils.createApp('apps/oss');
      return app.ready();
    });
    afterEach(mm.restore);
    after(function* () {
      if (lastUploadFileName) {
        yield app.oss.delete(lastUploadFileName);
      }
      yield app.close();
    });

    it('should upload file stream to oss', function* () {
      const result = yield app.httpRequest().get('/uploadtest').expect(200);
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
    afterEach(mm.restore);
    after(() => app.close());

    it('should query', () => {
      return app.httpRequest()
        .get('/')
        .expect(200);
    });
  });
});
