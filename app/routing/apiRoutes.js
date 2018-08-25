// Dependencies
var express = require("express");
var friends = require("../data/friends.js");

// Router Setup
var router = express.Router();

// Function to Parse Form Input
function formParse(userObj) {
    
    console.log(userObj);
    var score;
    var scores = [];

    for (var prop in userObj) {
        switch (userObj[prop]) {
            case "Strongly Disagree":
                score = 1;
                break;
            case "Disagree":
                score = 2;
                break;
            case "Neutral":
                score = 3;
                break;
            case "Agree":
                score = 4;
                break;
            case "Strongly Agree":
                score = 5;
                break;
        }
        scores.push(score);
    }

    matchScores(scores);
}

function matchScores(scores) {
    var index = [];
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
    formParse(req.body);
    res.json(req.body);
});

// Export
module.exports = router;