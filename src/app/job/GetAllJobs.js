const Operation = require('src/app/Operation');

class GetAllJobs extends Operation {
  constructor({ jobRepository }) {
    super();
    this.jobRepository = jobRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const users = await this.jobRepository.getAll();

      this.emit(SUCCESS, users);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllJobs.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllJobs;
