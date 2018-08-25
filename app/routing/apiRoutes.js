// Dependencies
var express = require("express");
var friends = require("../data/friends.js");

// Router Setup
var router = express.Router();

var index = [];

// Constructor to Add New Friend
function NewFriend(name, photo, scores) {
    this.name = name;
    this.photo = photo;
    this.scores = scores;
}

// Function to Parse Form Input
function parseInput(userObj) {
    var scores = [];
    for (var prop in userObj) {
        console.log(prop);
        if (prop.indexOf("q") == 0) {
            scores.push(parseInt(userObj[prop]));
        }
    }
    console.log(scores);
    matchScores(scores);
    friends.push(new NewFriend(userObj.name, userObj.photo, scores));
    console.log(friends);
}

// Function to Compare User Against Friends
function matchScores(scores) {
    for (var i = 0; i < friends.length; i++) {
        var sum = 0;
        var friendObj = {}
        for (var j = 0; j < scores.length; j++) {
            var diff = Math.abs(scores[j] - friends[i].scores[j]);
            sum = sum + diff
        }
        friendObj.name = friends[i].name;
        friendObj.score = sum
        index.push(friendObj);
    }
    console.log(index);
}

// Get Everything
router.get("/friends", function (req, res) {
    res.json(friends);
});

// Post to Friends
router.post("/friends", function (req, res) {
    console.log(req.body);
    parseInput(req.body);
    res.send(
        "<h1>Here are your results:<h1>" +
        "<p>A lower number means a metter match!</p>" +
        "<p>Your match with " + index[0].name + " is " + index[0].score + ".</p>" +
        "<p>Your match with " + index[1].name + " is " + index[1].score + ".</p>" +
        "<p>Your match with " + index[2].name + " is " + index[2].score + ".</p>" +
        "<p>Thank you. Your name has been added to the friends list</p>"
    );
});

// Export
module.exports = router;