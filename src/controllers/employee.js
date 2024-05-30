const db = require("../../models");
// const bcrypt = require("bcrypt");
require("dotenv").config();
//const message = require("../../constants/messages.json");

exports.showAll = async (req, res) => {
  const employee = await db.employee.findAll({
    include: { all: true, nested: true },
    //attributes: { exclude: ["photo", "createdAt", "updatedAt"] },
  });
  if (!employee) {
    res.send("No results found");
  }
  res.send(employee);
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const employee = await db.employee.findByPk(id);
if (employee === null) {
  res.status(400).send('Not found!');
} else {
  res.status(200).send("employee");
}
};

exports.add = async (req, res) => {};

exports.update = async (req, res) => {};

exports.deleteRecord = async (req, res) => {};

/*
//adding user
exports.addStudent = async (req, res) => {
  //checking for email already exists
  const check = await db.student.findOne({ where: { email: req.body.email } });
  if (check) {
    res.send(message.alreadyExists);
  }
  await db.student
    .create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await db.student
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: message.deleted,
        });
      } else {
        res.send({
          message: message.failed,
        });
      }
    })
    .catch((err) => {
      res.send({
        message: err.message || message.failed,
      });
    });
};
*/
