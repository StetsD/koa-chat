const Koa = require('koa');
const app = new Koa();
const config = require('./config');

const fs = require('fs');
const path = require('path');

const db = require('./db');
const router = require('./router');

app.keys = [config.secret];


let handlers = fs.readdirSync('./handlers');
handlers.forEach(handler => require('./handlers/' + handler).init(app));
app.use(require('koa-passport').session());
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

app.use(router.routes());



app.listen(config.port);
