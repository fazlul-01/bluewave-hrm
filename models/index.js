const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const bcrypt = require("bcrypt");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.dialect,
    define: {
      //freezeTableName: true,
    },
  }
);

sequelize.authenticate().then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log(err);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Require the model
db.administrator = require('./administrator')(sequelize, Sequelize);
module.exports = db;