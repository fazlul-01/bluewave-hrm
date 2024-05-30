const controller = require("../controllers/employee");
const {requireAuth} = require("../../config/authJwt");


const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

module.exports = (router) => {
    router.route("/employees").get(requireAuth, controller.showAll);
    router.route("/employees/:id").post(controller.showOne);
    //router.route("/employees").post(controller.addCourse);
    //router.route("/employees/:id").delete(controller.delete);
  };