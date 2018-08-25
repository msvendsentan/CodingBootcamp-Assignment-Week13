// Dependencies
var express = require("express");
var path = require("path");

// Router Setup
var router = express.Router();

// Pages
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

router.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

// Export
module.exports = router;