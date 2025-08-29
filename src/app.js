const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

// req.query is used for query params in url
// app.get("/user", (req, res) => {
//   console.log(req.query)
//   res.send({ name: "Ashish" });
// });

/*
req.params is used for dynamic url
app.get("/user/:userID/:name", (req, res) => {
  console.log(req.params)
  res.send({ name: "Ashish", info: 'req.params' });
});
*/

// app.get("/user", (req, res) => {
//   res.send({ name: "Ashish" });
// });

// app.post("/user", (req, res) => {
//   res.send("Data saved to DB");
// });

// app.delete("/user", (req, res) => {
//   res.send("Data successfully deleted");
// });

// app.use("/test", (req, res) => {
//   res.send("Hello from test");
// });

// Playing with Routes

/*
app.use(
  "/user",
  (req, res, next) => {
    console.log("1 Route");
    next();
    // res.send("1 Route");
  },
  (req, res, next) => {
    console.log("2 Route");
    next();
    // res.send("2 Route");
  },
  (req, res, next) => {
    console.log("3 Route");
    next();
    // res.send("3 Route");
  },
  (req, res, next) => {
    console.log("4 Route");
    next();
    // res.send("4 Route");
  },
  (req, res, next) => {
    console.log("5 Route");
    // next();
    // res.send("5 Route");
  }
);
*/

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("Get All Data");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User Deleted");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User Data fetched");
});

app.get("/user/login", (req, res) => {
  res.send("User logged In");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
