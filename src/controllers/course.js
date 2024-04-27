const db = require("../../models");

require("dotenv").config();
const message = require("../../constants/messages.json");

exports.showAll = async (req, res) => {
  const course = await db.course.findAll();
  if (!course) {
    res.send({ message: message.notFound });
  }

  res.send(course);
};
//adding user
exports.addCourse = async (req, res) => {
  //checking for email already exists

  await db.course
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
  await db.course
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
