const User = require('./User');

module.exports = function(sequelize, DataTypes) {
  const Job = sequelize.define('Job', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filled: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    user_id: {
      owner: User,
      type: DataTypes.INTEGER,
      required: false,
    },
  });


  Job.associate = (models) => {
    Job.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
  };

  return Job;
};
