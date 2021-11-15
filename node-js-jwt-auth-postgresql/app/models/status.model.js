module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define('statuses', {
    account_status: { type: Sequelize.STRING, unique: true, allowNull: false },
  });

  return Status;
};