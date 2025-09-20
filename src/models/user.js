const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 20,
    trim: true,
    match: /^[a-zA-Z]+\d+$/,
  },
  emailID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 50,
    trim: true,
    match: /^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Gender is not valid");
      }
    },
  },
  about: {
    type: String,
    default: "This is a about page of the user!",
  },
  skills: {
    type: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
