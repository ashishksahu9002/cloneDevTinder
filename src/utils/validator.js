const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, userName, emailID, password } = req.body;
  if (!(firstName || lastName)) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

module.exports = { validateSignUp };
