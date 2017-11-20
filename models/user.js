const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: 'Username is required field'
	},
	password: String
});

const UserModel = mongoose.model('User', UserSchema);

async function saveUser(user){
	return await UserModel.create(user);
}

async function getUserByName(user){
	return await UserModel.find({username: user.username});
}

module.exports = {
	saveUser, getUserByName
}
