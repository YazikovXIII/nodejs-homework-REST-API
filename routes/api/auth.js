const express = require("express");
const router = express.Router();
const joi = require("joi");
const { addUser } = require("../../controllers/users");
const schema = joi.object({
  email: joi.string().required().messages({
    "any.required": "Missing required email field",
  }),
  password: joi.string().required().messages({
    "any.required": "Missing required password field",
  }),
});

router.post("/register", async (req, res, next) => {
  try {
    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const { error } = schema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
