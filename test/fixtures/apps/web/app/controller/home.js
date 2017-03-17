'use strict';

exports.home = function* () {
  yield this.render('index.html', {
  	hello: 'world',
  });
};


exports.home2 = function* () {
  yield this.render('index', {
  	hello: 'world2',
  });
};

