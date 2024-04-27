const db = require("../../models");

require("dotenv").config();
const message = require("../../constants/messages.json");

exports.showAll = async (req, res) => {
  const result = await db.result.findAll({
    include: [
      {
        model: db.student,
      },
      {
        model: db.course,
      },
    ],
  });
  if (!result) {
    res.send({ message: message.notFound });
  }

  res.send(result);
};
//adding user
exports.addResult = async (req, res) => {
  //checking for email already exists

  await db.result
    .create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
};
