const Job = require('src/domain/job/Job');

const SequelizeJobMapper = {
  toEntity({ dataValues }) {
    const { id, filled, description, user_id } = dataValues;

    return new Job({ id, filled, description, user_id });
  },

  toDatabase(survivor) {
    const { description, user_id, filed } = survivor;

    return { description, user_id, filled };
  }
};

module.exports = SequelizeJobMapper;
