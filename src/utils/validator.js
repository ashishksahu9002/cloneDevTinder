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

const validateEditFields = (req) => {
  const isAllowedFields = [
    "firstName",
    "lastName",
    "userName",
    "age",
    "gender",
    "about",
    "skills",
  ];
  const isAllowedFlag = Object.keys(req.body).every((field) =>
    isAllowedFields.includes(field)
  );
  return isAllowedFlag;
};

const validatePassword = (password) => {
  return validator.isStrongPassword(password);
};

const validatePasswordFields = (req) => {
  const isAllowedPasswordFields = ["currentPassword", "newPassword"];
  const isAllowed = Object.keys(req.body).every((field) =>
    isAllowedPasswordFields.includes(field)
  );
  return isAllowed;
};

module.exports = {
  validateSignUp,
  validateEditFields,
  validatePasswordFields,
  validatePassword,
};
