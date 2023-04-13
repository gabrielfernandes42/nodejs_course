const express = require("express");
const router = express.Router();
const path = require("path");

router.get('^/$|/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login', 'login.html'));
  });

// router.get("^/$|/index(.html)?", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
// });

module.exports = router;
