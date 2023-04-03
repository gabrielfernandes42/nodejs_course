const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", {root: __dirname});
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page", (req, res) => {
  // res.sendFile("./views/index.html", {root: __dirname});
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

//Route handlers
app.get('/hello(.html)?', (req, res, next) => {
  console.log('attempted to load hello.html');
  next()
}, (req, res) => {
  res.send('Hello World!');
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
