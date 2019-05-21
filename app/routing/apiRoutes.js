var path = require("path");

var friends = require("../data/friends");


module.exports = function (app) {

    
    app.get("/api/friends", function (req, res) {

        res.json(friends);

    });

    
    app.post("/api/friends", function (req, res) {

        
        var newFriend = req.body;

        
        if (friends.length > 0) {

            
            var candidates = [];

            
            for (i = 0; i < friends.length; i++) {

                
                var scoreDiff = 0;

                
                for (j = 0; j < friends[i].scores.length; j++) {

                    
                    scoreDiff = scoreDiff + Math.abs(newFriend.scores[j] - friends[i].scores[j]);
                }

                
                candidates.push(scoreDiff);
            }

            
            var lowestDiff = candidates[0];

            
            for (i = 1; i <= candidates.length; i++) {
                 if (candidates[i] < lowestDiff) {
                     lowestDiff = candidates[i];
                 }
            }

            
            var bestMatch = friends[candidates.indexOf(lowestDiff)];

            
            res.json(bestMatch);
        }
        else {
            
            res.json("");
        }
        
        
        friends.push(newFriend);
    });
};