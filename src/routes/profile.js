const express = require("express");
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const {
  validateEditFields,
  validatePasswordFields,
  validatePassword,
} = require("../utils/validator");

const profileRouter = express.Router();

// Api to get profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditFields(req)) {
      throw new Error("Invalid Input Field");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} your profile is updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validatePasswordFields(req)) {
      return res.status(400).json({ error: "Wrong password fields" });
    }
    const { currentPassword, newPassword } = req.body;
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    const isPasswordValid = await user.validatePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({
        error: "New password must be different from current password",
      });
    }
    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        error: "New password must be a strong password",
      });
    }
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    user.password = newPasswordHash;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = profileRouter;
