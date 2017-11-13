var keys = require("./keys.js");

var request = require("request");
var fs = require("fs");

var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var clientTwitter = new Twitter(twitterKeys);
var clientSpotify = new Spotify(spotifyKeys);

var nodeCommand = process.argv[2];
var nodeArg = process.argv;
var userName = 'KevinArmani3';
var argPlusone = "";
var tweetParams = {screen_name: userName};

for (var i = 3;i<nodeArg.length; i++) {
	if (i > 3 && i < nodeArg.length) {
	argPlusone = argPlusone + "+" + nodeArg[i];
}else {
	argPlusone += nodeArg[i];
}
};


if (nodeCommand === "my-tweets") {
	getTweets();
}else if (nodeCommand === "spotify-this-song" && (argPlusone === "" || null)) {
		argPlusone = "The sign";
		getSpotify(argPlusone); 
}else if (nodeCommand === "spotify-this-song"){
	getSpotify(argPlusone); 
}else if (nodeCommand === "movie-this" && (argPlusone === "" || null)){
		argPlusone = "Mr.Nobody";
		getMovie(argPlusone);
}else if (nodeCommand === "movie-this"){
			getMovie(argPlusone);					
}else if (nodeCommand === "do-what-it-says"){
	justDoIt();
}else {
	console.log("Sorry could not understand your request.")
}

function getTweets(){
clientTwitter.get('statuses/user_timeline', tweetParams, function(error, tweets, response) {
  if (!error) {
     
  for (i = 0; i < tweets.length; i++) {
	    	console.log("Kayvan Tweeted: "+ tweets[i].text);
}

}else {
	console("error");
}
});
}

function getSpotify(value){

clientSpotify.search({ type: 'track', query: value,limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 

console.log("Artist: " + data.tracks.items[0].artists[0].name); 
console.log("Song Name: " + data.tracks.items[0].name); 
console.log("Link to Song: " + data.tracks.items[0].external_urls.spotify); 
console.log("Album: " + data.tracks.items[0].album.name); 
});
} 

function getMovie(value){

	var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";

console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country that Movie was Produced: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
	console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});

}  


function justDoIt(){
fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

 getSpotify(data);

});
}


