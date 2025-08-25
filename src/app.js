const express = require('express')

const app = express()

app.get("/",(req, res)=> {
  console.log('HOME handler');
  res.send("Hello Home")
})

app.get("/test",(req, res)=> {
  console.log('HOME test');
  res.send("Hello from test")
})

app.get("/about",(req, res)=> {
  console.log('HOME about');
  res.send("Hello from about")
})

app.listen(7777,()=> {
  console.log('server is running on port 7777')
})