const mongoose = require('mongoose');
const crypto = require('crypto');
const _ = require('lodash');
const config = require('../config');

let UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: "Username is required"
	},
	deleted: Boolean,
	passwordHash: {
		type: String,
		required: true
	},
	salt: {
		required: true,
		type: String
	}
}, {
	timestamp: true
});

UserSchema.virtual('password')
  .set(function(password) {

    if (password !== undefined) {
      if (password.length < 4) {
        this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
      }
    }

    this._plainPassword = password;

    if (password) {
      this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.crypto.hash.iterations,
        config.crypto.hash.length,
        'sha1'
      ).toString('base64');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function() {
    return this._plainPassword;
  });

UserSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  if (!this.passwordHash) return false;

  return crypto.pbkdf2Sync(
    password,
    this.salt,
    config.crypto.hash.iterations,
    config.crypto.hash.length,
    'sha1'
  ).toString('base64') == this.passwordHash;
};


module.exports = mongoose.model('User', UserSchema);
