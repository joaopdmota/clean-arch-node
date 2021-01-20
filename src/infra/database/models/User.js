module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    age: DataTypes.NUMBER,
  });

  return User;
};
