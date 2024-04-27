const student = require("./student");
const course = require("./course");
const result = require("./result");

module.exports = (router) => {
  student(router);
  course(router);
  result(router);

  return router;
};
