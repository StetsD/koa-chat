const Router = require('koa-router');
const router = new Router();
const {saveUser, getUserByName} = require('./models/user');

router.get('/*', (ctx, next) => {
    ctx.render('./templates/index.pug');
    next();
});

router.post('/registration', async (ctx, next) => {
    let {username, password, password2} = ctx.request.body;

    if(username && (password === password2)){
        await saveUser({username, password})
            .then(doc => {
                ctx.status = 200;
                ctx.body = {status: 'success'};
                next();
            })
            .catch(err => {
                ctx.status = 400;
                ctx.body = err;
                next();
            });
    }else{
        ctx.status = 400;
        ctx.body = {status: 'fail', msg: 'All fields are required'};
        next();
    }
});

router.post('/login', async (ctx, next) => {
    let {username, password} = ctx.request.body;

    if(username && password){
        await getUserByName({username})
            .then(data => {
                if(data.length){
                    if(data[0].password !== password){
                        ctx.status = 400;
                        ctx.body = {errors: {password: {message: `Bad Password`}}}
                        next();
                    }else{
                        ctx.status = 200;
                        ctx.body = {status: 'success'};
                        next();
                    }
                }else{
                    ctx.status = 400;
                    ctx.body = {errors: {username: {message: `User ${username} not found`}}};
                    next();
                }
            })
            .catch(err => {
                ctx.status = 400;
                ctx.body = err;
                next();
            })
    }else{
        ctx.status = 400;
        ctx.body = {status: 'fail', msg: 'All fileds are required'};
        next();
    }

});


module.exports = router;
