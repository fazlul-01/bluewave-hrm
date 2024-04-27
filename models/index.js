const Sequelize = require("sequelize");
require("dotenv").config();

//db configuration
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.dialect,
    operatorsAliases: 0,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//requiring models
db.student = require("./user")(sequelize, Sequelize);

db.course = require("./course")(sequelize, Sequelize);
db.result = require("./result")(sequelize, Sequelize);

//making associations
db.result.belongsTo(db.student, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "studentId",
});
db.student.hasMany(db.result, {
  foreignKey: "studentId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.result.belongsTo(db.course, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "courseId",
});
db.course.hasMany(db.result, {
  foreignKey: "courseId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

module.exports = db;
