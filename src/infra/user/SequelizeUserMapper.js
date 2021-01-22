const User = require('src/domain/user/User');

const SequelizeUserMapper = {
  toEntity({ dataValues }) {
    const { id, name, age, updatedAt, createdAt } = dataValues;

    return new User({ id, name, age, updatedAt, createdAt });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};

module.exports = SequelizeUserMapper;
