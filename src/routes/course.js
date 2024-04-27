const controller = require("../controllers/course");
// const middleware = require("../middleware/authJwt");

module.exports = (router) => {
  router.route("/courses").get(controller.showAll);
  router.route("/courses").post(controller.addCourse);
  router.route("/courses/:id").delete(controller.delete);
};
