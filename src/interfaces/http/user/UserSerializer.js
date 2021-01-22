const UserSerializer = {
  serialize({
    id,
    name,
    age,
    createdAt,
    updatedAt,
  }) {
    return {
      id,
      name,
      age,
      createdAt,
      updatedAt,
    };
  }
};

module.exports = UserSerializer;
