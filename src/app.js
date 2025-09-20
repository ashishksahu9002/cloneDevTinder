const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User (basically using the userSchema to make a User Class)

  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added to DB");
  } catch (err) {
    res.status(400).send("Error saving user data" + err.message);
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
app.patch("/user", async (req, res) => {
  const { userID, ...data } = req.body;
  console.log(userID);
  try {
    const user = await User.findByIdAndUpdate({ _id: userID }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!user) return res.status(404).send("User not found");
    console.log(user);
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
    console.log("Database not connected");
  });
