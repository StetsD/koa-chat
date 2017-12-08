const session = require('koa-session');
const mongooseStore = require('koa-session-mongoose');
const convert = require('koa-convert');
const db = require('../db');

exports.init = app => app.use(session({
	key: 'sid',
	rolling: true,
	cookie: {
		signed: false,
		path: '/',
		httpOnly: true,
		maxAge: 86400,
		overwrite: true
	},
	store: new mongooseStore({
		collection: 'Session',
		connection: db,
		expires: 84400,
		name: 'SII'
	})
}, app));
