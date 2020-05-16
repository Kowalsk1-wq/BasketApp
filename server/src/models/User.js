const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  active: {
    type: String,
    required: true
  },

  picture: {
    type: String,
    required: [true, 'User Picture is Required!']
  },

  deleteHash: {
    type: String,
    required: [true, 'User DeleteHash is Required!']
  },

  firstName: {
    type: String,
    required: [true, 'User First Name is Required!']
  },

  lastName: {
    type: String,
    required: [true, 'User Last Name is Required!']
  },

  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid Email Address!`
    },
    required: [true, 'User Email is Required!'],
    unique: true
  },

  password: {
    type: String,
    required: [true, 'User Password is Required!']
  },

  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2} \d{5}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User Phone Number is Required!'],
    unique: true
  },

  gender: {
    type: String,
    enum: ['M', 'F'],
    required: [true, 'User Gender is Required!']
  },

  city: {
    type: String,
    required: [true, 'User City is Required!']
  },

  uf: {
    type: String,
    required: [true, 'User UF is Required!']
  }

}, {
  timestamps: true
});

module.exports = model('User', UserSchema);
