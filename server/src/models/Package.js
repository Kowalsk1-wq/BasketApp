const { Schema, model } = require('mongoose');

const PackageSchema = new Schema({
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
    	required: [true, 'Item Name is Required!'],
		},

		quantity: {
			type: Number,
			min: 1,
			max: 10,
    	required: [true, 'Item Quantity is Required!']
		}
	}]
}, {
	timestamps: true
});

module.exports = model('Package', PackageSchema);
