const { Schema, model } = require('mongoose');

const MsgSchema = new Schema({
	author: String,
	content: String
}, {
	timestamps: true
});

module.exports = model('Message', MsgSchema);
