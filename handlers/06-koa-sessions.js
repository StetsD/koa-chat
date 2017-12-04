const session = require('koa-generic-session');
const mongooseStore = require('koa-session-mongoose');
const convert = require('koa-convert');

exports.init = app => app.use(convert(session({
	key: 'sid',
	rolling: true,
	cookie: {
		signed: false,
		path: '/',
		httpOnly: true,
		maxAge: 86400,
		overwrite: true
	},
	store: mongooseStore.create({
		model:   'Session',
		expires: 3600 * 4
	})
})));
