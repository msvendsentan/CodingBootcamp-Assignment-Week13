// Dependencies
var express = require("express");
var htmlRoutes = require("./app/routing/htmlRoutes.js");
var apiRoutes = require("./app/routing/apiRoutes.js");
var bodyParser = require("body-parser");
var path = require("path");

// Express Setup
var app = express();
var port = process.env.PORT || 8080;

// Data Parsing Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing
console.log(apiRoutes);
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

// Start Server
app.listen(port, function() {
    console.log("App listening on http://localhost:" + port);
});