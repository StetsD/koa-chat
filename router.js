const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const User = require('./models/user');
const pick = require('lodash/pick');

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
                ctx.status = 400;
                ctx.body = err;
                return next();
            });
    }else{
        ctx.status = 400;
        ctx.body = {status: 'fail', msg: 'All fields are required'};
        return next();
    }
});

router.post('/login', async (ctx, next) =>{
    await passport.authenticate('local', (err, user, info)=>{
        if(err) return next(err);

        if(!user){
            ctx.status = 400;
            ctx.body = {status: 'error', errors: {password: info}};
            return next();
        }

        ctx.status = 200;
        ctx.body = {status: 'success'};
        next();
    })(ctx, next);
});


module.exports = router;
