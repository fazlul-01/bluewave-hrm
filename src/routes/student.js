const controller = require("../controllers/student");
// const middleware = require("../middleware/authJwt");

module.exports = (router) => {
  router.route("/students").get(controller.showAll);
  router.route("/students").post(controller.addStudent);
  router.route("/students/:id").delete(controller.delete);
};
