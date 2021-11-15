module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    fullname: { type: Sequelize.STRING, allowNull: false },
    login: { type: Sequelize.STRING, unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    
    dob: { type: Sequelize.DATEONLY, allowNull: false },
    passport_serias: { type: Sequelize.STRING },
    passport_number: { type: Sequelize.STRING, unique: true, allowNull: false },
    passport_issue_date: { type: Sequelize.DATEONLY, allowNull: false },
    passport_authority: { type: Sequelize.STRING, allowNull: false },
    rntrc: { type: Sequelize.STRING, unique: true, allowNull: false },
  });

  return User;
};