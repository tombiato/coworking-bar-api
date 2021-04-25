const mongoose = require('mongoose');

const BarSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
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
	image: {
		type: String,
		default: 'no-image.png',
	},
});

module.exports = mongoose.model('Bar', BarSchema);
