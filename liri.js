require("dotenv").config();
var keys = require("./keys.js");
var fs = require('file-system');
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
// console.log('keys: ', keys);
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var commands = process.argv[2];
var nodeArgv = process.argv;
var name = ""
var songname = ""

if (commands === "my-tweets") {
    // var stream = client.stream('statuses/filter', {
    //     track: 'JavaScript'
    // });
    // stream.on('data', function (event) {
    //     console.log(event && event.text);
    // });

    // stream.on('error', function (error) {
    //     throw error;
    // });

    // You can also get the stream in a callback if you prefer.
   
    var params = {screen_name: 'dprybysh'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    console.log(tweets.length);
    for (var i = 0; i < 20; i++){
        console.log(tweets[i].text)
    }

  }
});

}   

function sp(song) {
    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name)
        console.log("The song's name: " + data.tracks.items[0].name);
        console.log("A preview link of the song from Spotify: " + data.tracks.items[0].artists[0].external_urls.spotify);
        console.log("The album that the song is from: " + data.tracks.items[0].album.name);
        //   .tracks.items[0]) 
    });
}

if (commands === "spotify-this-song") {

    name = nodeArgv[3];
    sp(name);
    // console.log(name);

}


if (commands === "movie-this") {

    // for (i = 3; i < nodeArgv.length; i ++){
    // if (i > 2 && i < nodeArgv.length) {
    //     name = name + "%20" + nodeArgv[i];
    //   }
    //   else {
    name = nodeArgv[3];
    //   }
    // }
    console.log('The name is: ' + name)
    var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
        }
    })
}

if (commands === "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            return console.log(error);
        }
        var res = data.split(",");
        // console.log(res);
        var todo = res[0];
        var todoWaht = res[1];
        if (todo === "spotify-this-song") {
            sp(todoWaht);
        }
    })

}