const User = require("../models/user");

const addUser = async (body) => {
  const existingContact = await User.findOne({ name: body.email });

  if (existingContact) {
    const error = new Error("Email already in use");
    error.status = 409;
    throw error;
  }
  return User.create(body);
};

module.exports = {
  addUser,
};
