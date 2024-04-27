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
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
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
