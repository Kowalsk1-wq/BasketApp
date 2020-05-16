const { Schema, model } = require('mongoose');

const ONGSchema = new Schema({
	active: {
    type: String,
    required: true
  },

  picture: {
    type: String,
    required: [true, 'ONG Picture is Required!']
  },

  deleteHash: {
    type: String,
    required: [true, 'ONG Delete Hash is Required!']
  },

  name: {
  	type: String,
  	required: [true, 'ONG Name is Required!']
  },

  represent: {
  	type: String,
  	required: [true, 'ONG Represent is Required!']
  },

  cnpj: {
  	type: String,
  	required: [true, 'ONG CNPJ is Required!']
  },

  email: {
  	type: String,
  	validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid Email Address!`
    },
  	required: [true, 'ONG Email is Required!'],
  	unique: true
  },

  password: {
  	type: String,
  	required: [true, 'ONG Password is Required!']
  },

  phone: {
  	type: String,
  	validate: {
      validator: function(v) {
        return /(\d{2}) \d{5}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  	required: [true, 'ONG Phone is Required!']
  },

  city: {
  	type: String,
  	required: [true, 'ONG City is Required!']
  },

  uf: {
  	type: String,
  	required: [true, 'ONG UF is Required!']
  }
}, {
  timestamps: true
});

module.exports = model('ONG', ONGSchema);
