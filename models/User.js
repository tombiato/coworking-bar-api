const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		city: {
			type: String,
			required: true,
		},
		number: {
			type: Number,
			required: true,
		},
		street: {
			type: String,
			required: true,
		},
	},
});

module.exports = mongoose.model('User', UserSchema);
