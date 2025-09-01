const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User (basically using the userSchema to make a User Class)
  const user = new User({
    firstName: "Akash",
    lastName: "Kumar",
    emailID: "akash@kumar.com",
    password: "akash@123",
  });

  try {
    await user.save();
    res.send("User added to DB");
  } catch (err) {
    res.status(400).send("Error saving user data" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database not connected");
  });
