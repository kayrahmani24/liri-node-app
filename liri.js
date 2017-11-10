var keys = require("./keys.js");

var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;

var Twitter = require('twitter');

var client = new Twitter(twitterKeys);

var nodeCommand = process.argv[2];
var nodeArg = process.argv[3];
var userName = 'KevinArmani3';

var params = {screen_name: userName};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
     
    console.log(response);
   
}
});