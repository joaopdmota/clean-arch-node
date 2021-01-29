const JobMapper = require('./SequelizeJobMapper');

class SequelizeJobRepository {
  constructor({ JobModel }) {
    this.JobModel = JobModel;
  }

  async getAll() {
    console.log(this.jobModel);
    const jobs = await this.JobModel.findAll();

    return jobs.map(JobMapper.toEntity);
  }

  async getById(id) {
    const job = await this._getById(id);

    return JobMapper.toEntity(job);
  }

  async add(job) {
    const { valid, errors } = job.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newJob = await this.JobModel.create(JobMapper.toDatabase(job));
    return JobMapper.toEntity(newJob);
  }

  async remove(id) {
    const job = await this._getById(id);

    await job.destroy();
    return;
  }

  async update(id, newData) {
    const user = await this._getById(id);

    const transaction = await this.JobModel.sequelize.transaction();

    try {
      const updatedUser = await user.update(newData, { transaction });
      const userEntity = JobMapper.toEntity(updatedUser);

      const { valid, errors } = userEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return userEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.JobModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.JobModel.findByPk(id, { rejectOnEmpty: true });
    } catch(error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Job with id ${id} can't be found.`;
        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeJobRepository;
