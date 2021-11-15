module.exports = (sequelize, Sequelize) => {
  const Workplace = sequelize.define('workplaces', {
    organization_name: { type: Sequelize.STRING, unique: true, allowNull: false },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
  });

  return Workplace;
};