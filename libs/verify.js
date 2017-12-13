const nodemailer = require('nodemailer');

const config = require('../config');
const {host, port, auth} = config.mailer;
let transporter = nodemailer.createTransport({host, port, auth, secure: true});
const Verify = require('../models/verify-tokens');
const User = require('../models/user');
const crypto = require('crypto');
const mongoose = require('mongoose');


module.exports = {
	sendVerify: async user => {

		let verifyToken = new Verify(
			{email: user.email,
			token: {
				val: (user.email + user.username).toString('base64'),
				email: user.email,
				username: user.username}
			});

		await verifyToken.save(err => {
			if(err) throw err;
		});

		let token = await Verify.findOne({email: user.email});
		token = token.hashToken;

		let options = {
			from: auth.user,
			to: user.email,
			text: 'VERIFY EMAIL',
			html: `<html>
				<head></head>
				<body>
					<h1>Hello and Die</h1>
					<a href="http://localhost:3000/verify?token=${token}">VERIFY</a>
				</body>
			</html>`
		}


		transporter.sendMail(options, (err, info) => {
			if(err){
				return console.error(err);
			}
			console.log(`Message send: ${info.messageId}`);
		});
	},
	checkVerify: async token => {
		let {email} = await Verify.findOne({hashToken: token});

		if(email){
			var {username, verify} = await User.findOne({email});
			if(verify){
				return false;
			}else{
				let checkToken = crypto.pbkdf2Sync(
					email,
					(email+username).toString('base64'),
					config.crypto.hash.iterations,
					config.crypto.hash.length,
					config.crypto.algorithm).toString('hex');
				if(checkToken === token){
					await User.update({username}, {
						verify: true
					});
					await Verify.remove({email});
					return true;
				}else{
					return false;
				}
			}
		}else{
			throw new Error("User not found");
		}
	}
}
