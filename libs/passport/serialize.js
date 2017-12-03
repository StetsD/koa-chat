const User = require('../../models/user');
const passport = require('koa-passport');

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  User.findOne({username:username}, done);
});
