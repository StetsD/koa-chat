const passport = require('koa-passport');


require('./localStrategy');
require('./serialize');

module.exports = passport;
