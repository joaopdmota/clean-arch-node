const { attributes } = require('structure');
const User = require('../user/User');

const Job = attributes({
  id: Number,
  filled: Boolean,
  description: String,
  user_id: {
    owner: User,
    type: Number,
    required: false,
  },
})(class Job {});

module.exports = Job;
