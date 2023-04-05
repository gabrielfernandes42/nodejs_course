const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");

const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//Crioss Origin resource sharing
// list of sites allowed to acesses my api
const whitelist = [
  "https://www.yoursite.com",
  "https://localhost:3500",
  "https://www.google.com",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatu: 200,
};

app.use(cors(corsOptions));

// bult-in middleware to handle urlencoded data
// in other words, form data
// 'content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// serve statci files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", {root: __dirname});
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page", (req, res) => {
  // res.sendFile("./views/index.html", {root: __dirname});
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

//Route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

//handle error
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
