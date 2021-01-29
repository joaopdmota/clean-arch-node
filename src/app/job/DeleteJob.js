const Operation = require('src/app/Operation');

class DeleteJob extends Operation {
  constructor({ jobRepository }) {
    super();
    this.jobRepository = jobRepository;
  }

  async execute(jobId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.jobRepository.remove(jobId);
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteJob.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteJob;
