const User = require("../models/user");

const addUser = async (body) => {
  const existingContact = await User.findOne({ name: body.email });

  if (existingContact) {
    throw new Error("Email already in use");
  }
  return User.create(body);
};

module.exports = {
  addUser,
};
