const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const {
  CreateUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
  DeleteUser
} = require('./app/user');
const {
  CreateJob,
  GetAllJobs,
  GetJob,
  UpdateJob,
  DeleteJob
} = require('./app/job');

const UserSerializer = require('./interfaces/http/user/UserSerializer');
const JobSerializer = require('./interfaces/http/job/JobSerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const SequelizeJobRepository = require('./infra/job/SequelizeJobRepository');
const { database, User: UserModel, Job: JobModel } = require('./infra/database/models');

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Repositories
container.register({
  usersRepository: asClass(SequelizeUsersRepository).singleton(),
  jobRepository: asClass(SequelizeJobRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  UserModel: asValue(UserModel),
  JobModel: asValue(JobModel),
});

// Operations
container.register({
  // user
  createUser: asClass(CreateUser),
  getAllUsers: asClass(GetAllUsers),
  getUser: asClass(GetUser),
  updateUser: asClass(UpdateUser),
  deleteUser: asClass(DeleteUser),
  // job
  createJob: asClass(CreateJob),
  getAllJobs: asClass(GetAllJobs),
  getJob: asClass(GetJob),
  updateJob: asClass(UpdateJob),
  deleteJob: asClass(DeleteJob),
});

// Serializers
container.register({
  userSerializer: asValue(UserSerializer),
  jobSerializer: asValue(JobSerializer)
});

module.exports = container;
