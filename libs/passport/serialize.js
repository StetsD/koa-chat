const passport = require('koa-passport');
const User = require('../../models/user');

passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser((user, done) => {
	User.findOne({username: user}, done);
});
