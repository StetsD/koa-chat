const localStrategy = require('passport-local');
const passport = require('koa-passport');
const User = require('../../models/user');

passport.use(new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({username}, (err, user) => {
            if(err) return done(err);

            if(user && user.checkPassword(password)){
                return done(null, user);
            }

            return done(null, false, {errors: {password: {message: 'Bad Password or User not found'}}});
        });
    }
))
