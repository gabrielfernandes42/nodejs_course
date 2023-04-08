const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");

// * Routes
const login = require("./routes/login")
const subdir = require("./routes/subdir")
const root = require("./routes/root")


const PORT = process.env.PORT || 3500;

// *  custom middleware logger
app.use(logger);

// * Crioss Origin resource sharing
// * list of sites allowed to acesses my api
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

//  bult-in middleware to handle urlencoded data
//  in other words, form data
//  'content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//  built in middleware for json
app.use(express.json());

//  routes
app.use("/",  root)
app.use("/subdir", subdir);
app.use("/login", login);
app.use("/employees", require('./routes/api/emplyees'));

//  serve statci files
app.use(express.static(path.join(__dirname, "/public")));



//handle error
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
