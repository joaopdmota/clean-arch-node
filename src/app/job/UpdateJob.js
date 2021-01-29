const Operation = require('src/app/Operation');

class UpdateJob extends Operation {
  constructor({ jobRepository }) {
    super();
    this.jobRepository = jobRepository;
  }

  async execute(jobId, jobData) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.outputs;

    try {
      const job = await this.jobRepository.update(jobId, jobData);
      this.emit(SUCCESS, job);
    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        this.emit(ERROR, error);
      }
    }
  }
}

UpdateJob.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdateJob;
