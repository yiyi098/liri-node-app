////////////////////////////////////////////////
/////////////////////Variables//////////////////
var allKeys = require("./keys.js");

var userInput = process.argv[2];

var media = process.argv;

var fs = require('fs');

var twitter = require('twitter');

var Spotify = require('node-spotify-api');

var spotify = new Spotify(allKeys.spotifyKeys);

var request = require('request');

////////////////////////////////////////////////
/////////////////Twitter Stuff//////////////////
function getTweets() {
  twitter(allKeys.twitterKeys).get('statuses/user_timeline', function(error, tweets, response) {
    if (!error) {
      console.log('-----------------------------------------');
      log('-----------------------------------------');
      for (var i = 0; i < tweets.length; i ++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        log(tweets[i].text);
        log(tweets[i].created_at);
        log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      }
      console.log('-----------------------------------------');
    }
  });
}

////////////////////////////////////////////////
/////////////////Spotify Stuff//////////////////
function getSpotifySongs() {
  var songName = '';

  for (var i = 3; i < media.length; i++) {
    songName += media[i] + " ";
  }

  if (songName) {
    spotify.search({ type: 'track', query: songName, limit: 1}, function(err, data) {  
      if (err) {
        return console.log('Error occurred: ' + err);
      }
        // console.log(JSON.stringify(data, null, 2));
        console.log('-----------------------------------------');
        console.log('Artist(s): ' + JSON.stringify(data.tracks.items[0].artists[0].name));
        console.log('Song\'s Name: ' + JSON.stringify(data.tracks.items[0].name)); 
        console.log('Preview link: ' + JSON.stringify(data.tracks.items[0].preview_url)); 
        console.log('Album: ' + JSON.stringify(data.tracks.items[0].album.name)); 
        console.log('-----------------------------------------');
        log('-----------------------------------------');
        log('Artist(s): ' + JSON.stringify(data.tracks.items[0].artists[0].name));
        log('Song\'s Name: ' + JSON.stringify(data.tracks.items[0].name)); 
        log('Preview link: ' + JSON.stringify(data.tracks.items[0].preview_url)); 
        log('Album: ' + JSON.stringify(data.tracks.items[0].album.name)); 
    }); 
  } else {
    spotify
      .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
      .then(function(data) {
        // console.log(data);
        console.log('-----------------------------------------');
        console.log('You haven\'t provided a song. Please enjoy the following instead: ');
        console.log('Artist(s): ' + JSON.stringify(data.album.artists[0].name));
        console.log('Song\'s Name: ' + JSON.stringify(data.name)); 
        console.log('Preview link: ' + JSON.stringify(data.preview_url)); 
        console.log('Album: ' + JSON.stringify(data.album.name)); 
        console.log('-----------------------------------------');
        log('-----------------------------------------');
        log('You haven\'t provided a song. Please enjoy the following instead: ');
        log('Artist(s): ' + JSON.stringify(data.album.artists[0].name));
        log('Song\'s Name: ' + JSON.stringify(data.name)); 
        log('Preview link: ' + JSON.stringify(data.preview_url)); 
        log('Album: ' + JSON.stringify(data.album.name)); 
    });
  } 
}

////////////////////////////////////////////////
/////////////////Omdb Stuff/////////////////////
function getMovieInfo() {
  var movieName = '';

  for (var i = 3; i < media.length; i++) {
    movieName += media[i] + " ";
  }
  
  if (movieName) { 
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log(body);
        console.log('-----------------------------------------');
        console.log('Movie Title: ' + JSON.parse(body).Title);
        console.log('Release Year: ' + JSON.parse(body).Year);
        console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
        console.log('Country Movie is Produced: ' + JSON.parse(body).Country);
        console.log('Language: ' + JSON.parse(body).Language);
        console.log('Plot: ' + JSON.parse(body).Plot);
        console.log('Actors: ' + JSON.parse(body).Actors);
        console.log('-----------------------------------------');
        log('-----------------------------------------');
        log('Movie Title: ' + JSON.parse(body).Title);
        log('Release Year: ' + JSON.parse(body).Year);
        log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
        log('Country Movie is Produced: ' + JSON.parse(body).Country);
        log('Language: ' + JSON.parse(body).Language);
        log('Plot: ' + JSON.parse(body).Plot);
        log('Actors: ' + JSON.parse(body).Actors);
      }
    });
  } else {
    movieName = 'Mr. Nobody';
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log(body);
        console.log('-----------------------------------------');
        console.log('You haven\'t provided a movie. Please enjoy the following instead: ')
        console.log('Movie Title: ' + JSON.parse(body).Title);
        console.log('Release Year: ' + JSON.parse(body).Year);
        console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
        console.log('Country Movie is Produced: ' + JSON.parse(body).Country);
        console.log('Language: ' + JSON.parse(body).Language);
        console.log('Plot: ' + JSON.parse(body).Plot);
        console.log('Actors: ' + JSON.parse(body).Actors);
        console.log('-----------------------------------------');
        log('-----------------------------------------');
        log('You haven\'t provided a movie. Please enjoy the following instead: ')
        log('Movie Title: ' + JSON.parse(body).Title);
        log('Release Year: ' + JSON.parse(body).Year);
        log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
        log('Country Movie is Produced: ' + JSON.parse(body).Country);
        log('Language: ' + JSON.parse(body).Language);
        log('Plot: ' + JSON.parse(body).Plot);
        log('Actors: ' + JSON.parse(body).Actors);
      }
    });
  }
}
 
////////////////////////////////////////////////
/////////////////random.txt Stuff///////////////
function doRandomText() {
  fs.readFile("random.text", "utf8", function(error, data) {
    if (error) {
        return console.log(error);
    }
    // console.log(data);
    var dataArr = data.split(",");
    // console.log(dataArr);
    userInput = dataArr[0];
    dataArr.splice(1, 0, '', '');
    media = dataArr;
    // console.log(media);
    checkCommand();
  });
}

////////////////////////////////////////////////
/////////////////////Helper/////////////////////
function log(text) {
  fs.appendFile("log.text", '\n' + text, function(err) {
    if (err) {
        return console.log(err);
    }
  });
}

////////////////////////////////////////////////
//////////////Overall Logic/////////////////////
function checkCommand() {
  if (userInput === 'my-tweets') {
    getTweets();
  }
  else if (userInput === 'spotify-this-song') {
    getSpotifySongs();
  }
  else if (userInput === 'movie-this') {
    getMovieInfo();
  }
  else if (userInput === 'do-what-it-says') {
    doRandomText();
  }
}

///////////////////////////////////////////////
//////////////Execute the JS///////////////////
checkCommand();



