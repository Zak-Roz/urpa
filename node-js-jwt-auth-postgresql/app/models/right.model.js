module.exports = (sequelize, Sequelize) => {
  const Rights = sequelize.define('rights', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Rights;
};