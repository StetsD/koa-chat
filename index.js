const Koa = require('koa');
const app = new Koa();
const config = require('./config');

const fs = require('fs');
const path = require('path');

const db = require('./db');
const router = require('./router');

let handlers = fs.readdirSync('./handlers');
handlers.forEach(handler => require('./handlers/' + handler).init(app));

app.use(router.routes());

app.use(async (ctx, next) => {
	try{
		await next();
	}catch(e){
		if(e.status){
			ctx.body = e.message;
			ctx.status = e.status;
		}else{
			ctx.body = 'Error 500';
			ctx.status = 500;
			console.error(e.message, e.stack);
		}
	}
});

app.listen(config.port);
