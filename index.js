const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

const config = require('config');

const fs = require('fs');
const path = require('path');

const router = new Router();

let handlers = fs.readdirSync('./handlers');
handlers.forEach(handler => require('./handlers/' + handler).init(app));


router.get('/', (ctx, next) => {

});

app.use(router.routes());


app.listen(config.get('port'));
