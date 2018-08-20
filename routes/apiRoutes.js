var path = require("path");
var _ = require('lodash');
var friends = require("./../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        //***********************
        // var friends1 = friends[0].scores[5];
        // var friends2 = friends[1].scores[5];
        // function difference(a, b) {
        //     return Math.abs(a - b);
        // }
        // console.log(difference(friends1, friends2));
        //***********************
        //grabs the new friend's scores to compare with friends in friendList array
        var newFriendScores = req.body.scores;
        var scoresArray = [];
        var friendCount = 0;
        var bestMatch = 0;

        //runs through all current friends in list
        for (var i = 0; i < friends.length; i++) {
            var scoresDiff = 0;
            //run through scores to compare friends
            for (var j = 0; j < newFriendScores.length; j++) {
                scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j])));
            }
            console.log(scoresArray);
            //push results into scoresArray
            scoresArray.push(scoresDiff);
        }

        //after all friends are compared, find best match
        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }

        //return bestMatch data
        var bff = friends[bestMatch];
        res.json(bff);
        console.log(bff);
        //pushes new submission into the friendsList array
        friends.push(req.body);
    })
}