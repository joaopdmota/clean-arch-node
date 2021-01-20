const User = require('./User');

module.exports = function(sequelize, DataTypes) {
  const Job = sequelize.define('job', {
    filled: Boolean,
    description: String,
    user_id: {
      owner: User,
      type: Number,
      required: false,
    },
  });



  return Job;
};
