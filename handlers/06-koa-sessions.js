const session = require('koa-session');
const mongooseStore = require('koa-session-mongoose');
const genericSession = require('koa-generic-session');
const db = require('../db');

exports.init = app => app.use(session({
	key: 'sid',
	store: new mongooseStore({
		expires: 84000
	})
}, app));
