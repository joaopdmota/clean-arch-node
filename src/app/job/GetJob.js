const Operation = require('src/app/Operation');

class GetJob extends Operation {
  constructor({ jobRepository }) {
    super();
    this.jobRepository = jobRepository;
  }

  async execute(jobId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const job = await this.jobRepository.getById(jobId);
      this.emit(SUCCESS, job);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetJob.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetJob;
