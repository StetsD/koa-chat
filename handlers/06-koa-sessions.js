const session = require('koa-generic-session');
const mongooseSession = require('koa-session-mongoose');

exports.init = app => app.use(session({
	key: 'SID',
	rolling: true,
	cookie: {
		signed: true,
		path: '/',
		httpOnly: true,
		maxAge: 86400,
		rewrite: true,
		overwrite: true
	},
	store: new mongooseSession({
		name: 'sessions',
		expires: 86400,
	})
}));
