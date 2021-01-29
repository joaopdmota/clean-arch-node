const JobSerializer = {
  serialize({
    id,
    filled,
    description,
    user_id,
  }) {
    return {
      id,
      filled,
      description,
      user_id,
    };
  }
};

module.exports = JobSerializer;
