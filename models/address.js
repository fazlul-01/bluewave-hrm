module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "address",
    {
      addressId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      streetAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unitSuite: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stateProvince: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postalZipCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
