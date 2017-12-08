const Router = require('koa-router');
const router = new Router();
const User = require('./models/user');
const passport = require('koa-passport');

router.get('/*', (ctx, next) => {
    ctx.render('./templates/index.pug');
    next();
});

router.post('/registration', async (ctx, next) => {
    let {username, password, password2} = ctx.request.body;

    if(username && (password === password2)){
        const user = await User.create({username, password});
        await ctx.login(user)
            .then(doc => {
                ctx.status = 200;
                ctx.body = {status: 'success'};
                return next();
            })
            .catch(err => {
                console.error(err);
                ctx.status = 500;
                ctx.body = {status: 'error', msg: 'Internal Server Error'};
                return next();
            });
    }else{
        ctx.status = 400;
        ctx.body = {status: 'error', msg: 'All fields are required'};
        return next();
    }
});

router.post('/login', async (ctx, next) => {
    await passport.authenticate('local', async (err, user, msg)=>{
        if(err) return msg;
        if(!user){
            ctx.status = 400;
            ctx.body = msg;
            return next();
        }
        ctx.login(user)
            .then(res => {
                ctx.status = 200;
                ctx.body = {status: 'success'};
                return next();
            })
            .catch(err => {
                ctx.status = 500;
                return next();
            });
    })(ctx, next);
});


module.exports = router;
