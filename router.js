const Router = require('koa-router');
const router = new Router();
const User = require('./models/user');
const passport = require('koa-passport');
const {sendVerify, checkVerify} = require('./libs/verify');

router.get('/*', (ctx, next) => {
    ctx.render('./templates/index.pug');
    next();
});

router.get('/verify', async (ctx, next) => {
    let urlToken = ctx.request.query.token;
    let result = await checkVerify(urlToken);

    ctx.redirect('/chat');
    ctx.status = 301;
});



router.post('/registration', async (ctx, next) => {
    let {username, password, password2, email} = ctx.request.body;

    if(username && email && (password === password2)){
        const user = await User.create({username, password, email});
		ctx.status = 200;
		ctx.body = {status: 'success'};
		return next();

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
                sendVerify(user);
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
