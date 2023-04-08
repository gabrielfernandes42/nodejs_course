const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");

// * server PORT
const PORT = process.env.PORT || 3500;

// *  custom middleware logger
app.use(logger);

// * Cross Origin resource sharing
// * list of sites allowed to acesses my api
app.use(cors(corsOptions));

// * bult-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

// * built in middleware for json
app.use(express.json());

// * serve static files
app.use(express.static(path.join(__dirname, "/public")));

// * routes
app.use("/", require("./routes/root"));
app.use("/login", require("./routes/login"));
app.use("/employees", require("./routes/api/emplyees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

// * handle error
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
