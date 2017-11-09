const session = require('koa-generic-session');
exports.init = app => app.use(session({
	cookie: {
		signed: true
	}
}));
