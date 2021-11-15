module.exports = (sequelize, Sequelize) => {
  const Journalism = sequelize.define('journalisms', {
    journal_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    action_data: { type: Sequelize.DATE, allowNull: false },
    action_description: { type: Sequelize.JSON, allowNull: false },
  });

  return Journalism;
};