const { Schema, model } = require('mongoose');

const DonationSchema = new Schema({
	date: String,
	approved: Boolean,
	items: [{
		name: String,
		quantity: Number,
	}],
	basket: {
		type: Schema.Types.ObjectId,
		ref: 'Basket'
	},
	ong: {
		type: Schema.Types.ObjectId,
		ref: 'ONG'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = model('Donation', DonationSchema);
