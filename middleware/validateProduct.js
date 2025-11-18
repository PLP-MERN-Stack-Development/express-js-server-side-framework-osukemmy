const ValidationError = require("../errors/ValidationError");

module.exports = (req, res, next) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return next(new ValidationError("All required fields must be provided"));
  }

  if (typeof price !== "number") {
    return next(new ValidationError("Price must be a number"));
  }

  next();
};
