module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "result",
    {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "course",
          key: "id",
        },
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "student",
          key: "id",
        },
      },

      score: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      alter: true,
      freezeTableName: true,
      tableName: "result",
      timestamps: true,
      underscored: false,
    }
  );
};
