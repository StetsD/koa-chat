const serve = requrie('koa-static');
const config = require('config');

exports.init = app => app.use(serve(config.get('static')));
