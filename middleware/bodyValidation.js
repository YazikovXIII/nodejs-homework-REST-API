const customError = require("../helpers/customError");

const bodyValidation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (!req.body || Object.keys(req.body).length === 0) {
        next(customError("missing fields", 400));
      }
      next(customError(error.message, 400));
    }
    next();
  };
  return func;
};

module.exports = bodyValidation;
