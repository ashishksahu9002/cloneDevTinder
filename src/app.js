const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUp } = require("./utils/validator");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // Validation of Data
    validateSignUp(req);

    const { firstName, lastName, userName, emailID, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10); // bcrypt.hash gives a promise
    console.log('passwordHash : ', passwordHash)

    // Creating a new instance of the User (basically using the userSchema to make a User Class)
    const user = new User({
      firstName,
      lastName,
      userName,
      emailID,
      password: passwordHash,
    });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailID: user.emailID,
        userName: user.userName,
      },
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Api to get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;
  try {
    const users = await User.find({ emailID: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Api to get all the user
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No user data available");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Api to delete user
app.delete("/user", async (req, res) => {
  const userID = req.body.userID;
  try {
    const user = await User.findByIdAndDelete(userID);
    // const user = await User.findByIdAndDelete({ _id: userID });
    if (!user) {
      res.status(404).send("No user data available");
    } else {
      res.send("User deleted successfully");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Api to update user
app.patch("/user/:userID", async (req, res) => {
  const userID = req.params?.userID;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["userName", "gender", "about", "skills", "age"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userID }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    if (!user) return res.status(404).send("User not found");
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("UPDATE FAILED : " + error.message);
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
    console.log("Database not connected : ", err);
  });
