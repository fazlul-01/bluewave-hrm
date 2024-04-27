module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      alter: true,
      freezeTableName: true,
      tableName: "user",
      timestamps: true,
      underscored: false,
    }
  );
};
