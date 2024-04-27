const controller = require("../controllers/result");
// const middleware = require("../middleware/authJwt");

module.exports = (router) => {
  router.route("/results").get(controller.showAll);
  router.route("/results").post(controller.addResult);
};
