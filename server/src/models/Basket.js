const { Schema, model } = require('mongoose');

const BasketSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'ONG',
		required: true
	},

	name: {
		type: String,
    required: true
	},

	description: {
		type: String,
    required: true
	},

	items: [{
		name: {
			type: String,
			required: true,
			unique: false
		},
		quantity: Number
	}],

	status: {
		type: String,
		enum: ['Em Andamento', 'Concluída']
	}
}, {
	timestamps: true
});

module.exports = model('Basket', BasketSchema);
