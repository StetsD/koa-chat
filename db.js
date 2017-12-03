const mongoose = require('mongoose');
const unique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(unique);
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
const db = mongoose.connect('mongodb://127.0.0.1:27017/koa-e', {useMongoClient: true});



module.exports = db;
