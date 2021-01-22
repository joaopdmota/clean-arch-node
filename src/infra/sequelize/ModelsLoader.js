const fs = require('fs');
const path = require('path');
module.exports = {
  load({
    sequelize, Sequelize, baseFolder, indexFile = 'index.js',
  }) {
    const loaded = {};
    fs
      .readdirSync(baseFolder)
      .filter(file => (file.indexOf('.') !== 0) && (file !== indexFile) && (file.slice(-3) === '.js'))
      .forEach((file) => {
        const model = require(path.join(baseFolder, file))(sequelize, Sequelize.DataTypes);
        loaded[model.name] = model;
      });
    Object.keys(loaded).forEach((modelName) => {
      if (loaded[modelName].associate) {
        loaded[modelName].associate(loaded);
      }
    });
    loaded.database = sequelize;
    loaded.Sequelize = Sequelize;
    return loaded;
  },
};
