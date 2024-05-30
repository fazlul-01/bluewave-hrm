const controller = require("../controllers/authentication");



module.exports = (router) => {
    router.route("/login").get(controller.login);
    router.route("/signup").get(controller.signup);
    router.route("/signup").post(controller.signup);
    router.route("/logout").post(controller.logout);
    router.route("/logout").get(controller.logout);
    router.route("/forgotpassword").post(controller.forgotPassword);
    router.route("/resetpassword/:token").patch(controller.resetPassword);
    //router.route("/employees").post(controller.addCourse);
    //router.route("/employees/:id").delete(controller.delete);
};