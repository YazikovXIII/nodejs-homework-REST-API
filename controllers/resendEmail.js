const customError = require("../helpers/customError");
const sendVerificationEmail = require("../helpers/sendEmail");
const User = require("../models/user");

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw customError("Email not found", 400);
    }

    if (user.verify) {
      throw customError("Verification has already been passed", 400);
    }

    sendVerificationEmail(user.email, user.verificationToken);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
