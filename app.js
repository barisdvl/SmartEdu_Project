const express = require("express");
const ejs = require("ejs");

const app = express();

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Index Sayfası");
});

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
