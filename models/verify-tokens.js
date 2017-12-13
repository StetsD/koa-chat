const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config');

const verifySchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	hashToken: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		expires: 20
	}
});

verifySchema.virtual('token')
	.set(function(hashComponents){
		let {val, email, username} = hashComponents;

		this.hashToken = crypto.pbkdf2Sync(
			email,
			val,
			config.crypto.hash.iterations,
			config.crypto.hash.length,
			config.crypto.algorithm).toString('hex');
	});



module.exports = mongoose.model('Verify', verifySchema);
