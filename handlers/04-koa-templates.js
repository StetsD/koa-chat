const pug = require('pug');

exports.init = app => app.use(async (ctx, next) => {
    ctx.render = (temp, locals) => {
        ctx.body = pug.renderFile(temp, locals);
    }
    next();
});
