const express = require("express");

const app = express();

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
