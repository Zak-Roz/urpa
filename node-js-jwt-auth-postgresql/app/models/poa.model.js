module.exports = (sequelize, Sequelize) => {
  const Poa = sequelize.define('poas', {
    principal_name: { type: Sequelize.STRING/*, allowNull: false*/ },

    principal_code: { type: Sequelize.STRING/*, allowNull: false*/ },

    confident_name: { type: Sequelize.STRING/*, allowNull: false*/ },
    
    confident_code: { type: Sequelize.STRING/*, allowNull: false*/ },

    registration_date: { type: Sequelize.DATEONLY/*, allowNull: false*/ },

    blank_series: { type: Sequelize.STRING/*, allowNull: false*/ },

    blank_number: { type: Sequelize.STRING/*, allowNull: false*/ },

    certification_date: { type: Sequelize.DATEONLY/*, allowNull: false*/ },

    // register_number: { type: Sequelize.STRING/*, allowNull: false*/ },

    expiry_date: { type: Sequelize.DATEONLY/*, allowNull: false*/ },

    is_duplicate: { type: Sequelize.BOOLEAN/*, allowNull: false*/ },
    
    property: { type: Sequelize.STRING(5000)/*, allowNull: false*/ },
  });

  return Poa;
};