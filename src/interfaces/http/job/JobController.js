const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const JobController = {
  get router() {
    const router = Router();

    router.use(inject('jobSerializer'));

    router.get('/', inject('getAllJobs'), this.index);
    router.get('/:id', inject('getJob'), this.show);
    router.post('/', inject('createJob'), this.create);
    router.put('/:id', inject('updateJob'), this.update);
    router.delete('/:id', inject('deleteJob'), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllJobs, jobSerializer } = req;
    const { SUCCESS, ERROR } = getAllJobs.outputs;

    getAllJobs
      .on(SUCCESS, (jobs) => {
        res
          .status(Status.OK)
          .json(jobs.map(jobSerializer.serialize));
      })
      .on(ERROR, next);

    getAllJobs.execute();
  },

  show(req, res, next) {
    const { getJob, jobSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getJob.outputs;

    getJob
      .on(SUCCESS, (job) => {
        res
          .status(Status.OK)
          .json(jobSerializer.serialize(job));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    getJob.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const { createJob, jobSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createJob.outputs;

    createJob
      .on(SUCCESS, (job) => {
        res
          .status(Status.CREATED)
          .json(jobSerializer.serialize(job));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

      createJob.execute(req.body);
  },

  update(req, res, next) {
    const { updateJob, jobSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateJob.outputs;

    updateJob
      .on(SUCCESS, (job) => {
        res
          .status(Status.ACCEPTED)
          .json(jobSerializer.serialize(job));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    updateJob.execute(Number(req.params.id), req.body);
  },

  delete(req, res, next) {
    const { deleteJob } = req;
    const { SUCCESS, ERROR,  NOT_FOUND } = deleteJob.outputs;

    deleteJob
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    deleteJob.execute(Number(req.params.id));
  }
};

module.exports = JobController;
