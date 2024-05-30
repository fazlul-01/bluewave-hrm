const db = require("../../models");
var validator = require("validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mailService = require("../helper/email");

const { handleError, validatePassword} = require("../helper/validation");
const message = require("../../constants/messages.json");
// const bcrypt = require("bcrypt");

// create json web token
const maxAge = 3 * 60 * 60; // 3 hours
const createToken = (id) => {
  return jwt.sign({ id }, process.env.secret, {
    expiresIn: maxAge,
  });
};

const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const { isErr, error } = handleError(email, password, confirmPassword, true);

  if (isErr) {
    return res.status(400).send({ error });
  }

  const checkMail = await db.administrator.findOne({
    where: { email: email.toLowerCase() },
  });
  if (checkMail) {
    error.email = message.alreadyExists;
    return res.status(400).send({ error });
  }

  try {
    const user = await db.administrator.create(req.body);
    const token = createToken(user.email);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user.email });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }

};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email exists
    const user = await db.administrator.findOne({
      where: { email: email.toLowerCase() },
    });
    if (user) {
      const auth = await bcrypt.compare(password, user.password); // Check if the password matched
      if (auth) {
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ user: user.email });
      }
    }
    return res.status(400).json({ error: message.loginError });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

const logout = async (req, res) =>{
    res.cookie('jwt', '', { maxAge: 1 });
  res.send('<h2>You have successfully logged out.</h2>');
}

const forgotPassword = async (req, res, next) => {
  //1. Get user based on the posted email
  const { email } = req.body;

  const user = await db.administrator.findOne({
    where: { email: email.toLowerCase() },
  });
  if (!user) {
    return res.status(404).json({ error: `user ${message.notFound}`});
  }
  //2. Generate a random reset token
  const resetToken = crypto.randomBytes(64).toString("hex");
  //Hash resetToken
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 25);// 25 min from now

  //3. Send the plain resetToken to the user email and update user's passwordResetToken and passwordResetTokenExpiresAt in the database
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/resetpassword/${resetToken}`;
  const message = `You have requested to reset your password. Please use the link below to reset your password\n\n${resetUrl}\n\nThis reset password link will expire in 25 minutes.`;

  try {
    await mailService.sendEmail({
      email: user.email,
      subject: "Password change request",
      message: message,
    });

    user.set({
        passwordResetToken: hashedResetToken,
        passwordResetTokenExpiresAt: expiresAt,
      });
await user.save();

    res.status(200).json({
      status: "success",
      message: "password reset link sent to the user email",
    });
  } catch (err) {
    // reset passwordResetToken to null;
    // passwordResetTokenExpires: null;
    // error message There is an error sending password reset email. Please try again later.code 500
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

const resetPassword = async (req, res, next) => {
    //Hash the plain token
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');

    //Find user based on the parameter token
    const user = await db.administrator.findOne({ where: {passwordResetToken: token, passwordResetTokenExpiresAt : { [db.Sequelize.Op.gt]: Date.now() } } });
    if(!user){ // If user is null, the token is invalid or expired
      return  res.status(400).json({
            error: message.invalidToken
        })
    }

    const {password, confirmPassword} = req.body;

    // Check if the new password is valid
    const passwordCheck = validatePassword(password);
    if(!passwordCheck.isValid){
        return res.status(400).json({
            passwordError : passwordCheck.message
        });
    }

    // Check if password and confirmPassword matched
    if(password !== confirmPassword){
        return res.status(400).json({
            passwordError : message.notMatched
        });
    }

    user.set({
        password: password, //Reset password
        passwordChangedAt: new Date(),
        passwordResetToken: null,
        passwordResetTokenExpiresAt: null,
      });

      await user.save();

   res.json({message: message.passwordChanged})
};

module.exports = { signup, login, logout, forgotPassword, resetPassword };
