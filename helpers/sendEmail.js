const mailgun = require("mailgun-js");
require("dotenv").config();
const User = require("../models/user");
const { MG_API_KEY, MG_DOMAIN } = process.env;
const apiKey = MG_API_KEY;
const domain = MG_DOMAIN;
const mg = mailgun({ apiKey, domain });

const sendVerificationEmail = async (toEmail, verificationToken) => {
  return new Promise((resolve, reject) => {
    const verificationLink = `http://localhost:3000/users/verify/${verificationToken}`;
    const data = {
      from: "Your App <noreply@yourapp.com>",
      to: toEmail,
      subject: "Email Verification",
      text: `Click on the following link to verify your email: ${verificationLink}`,
    };

    mg.messages().send(data, (error, body) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", body);
        resolve();
      }
    });
  });
};

const resendEmail = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    const error = new Error("User not found");
    error.status = 400;
    throw error;
  }
  if (user.verify === true) {
    const error = new Error("Verification has already been passed");
    error.status = 400;
    throw error;
  }
  sendVerificationEmail(user.email, user.verificationToken);
  return user;
};

module.exports = { sendVerificationEmail, resendEmail };
