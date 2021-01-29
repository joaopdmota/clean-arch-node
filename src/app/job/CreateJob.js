const Operation = require('src/app/Operation');
const Job = require('src/domain/job/Job');

class CreateJob extends Operation {
  constructor({ jobRepository }) {
    super();
    this.jobRepository = jobRepository;
  }

  async execute(userData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const job = new Job(userData);

    try {
      const newJob = await this.jobRepository.add(job);

      this.emit(SUCCESS, newJob);
    } catch(error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateJob.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateJob;
