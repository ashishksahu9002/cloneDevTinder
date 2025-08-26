const express = require("express");

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

app.get("/user", (req, res) => {
  res.send({ name: "Ashish" });
});

app.post("/user", (req, res) => {
  res.send("Data saved to DB");
});

app.delete("/user", (req, res) => {
  res.send("Data successfully deleted");
});

app.use("/test", (req, res) => {
  res.send("Hello from test");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
