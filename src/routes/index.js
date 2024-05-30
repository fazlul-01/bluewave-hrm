const employee = require("./employee");
const authentication = require("./authentication");
//const course = require("./course");
//const result = require("./result");

module.exports = (router) => {
  employee(router);
  authentication(router);
  //course(router);
  //result(router);

  return router;
};
