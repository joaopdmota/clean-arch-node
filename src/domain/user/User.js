const { attributes } = require('structure');

const User = attributes({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  age: Number,
  updatedAt: Date,
  createdAt: Date,
})(class User {});

module.exports = User;
