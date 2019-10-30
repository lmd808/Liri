// require components from my .env file
require('dotenv').config();
// require spotify
var Spotify = require('node-spotify-api');
// require keys.js file
var keys = require('./keys.js');
// require Axios
var axios = require('axios');
// require fs
var fs = require('fs');
var moment = require('moment');
// create spotify variable for working key
var spotify = new Spotify(keys.spotify);
// var spotify = new Spotify(keys.spotify);

// variables to hold input
var command = process.argv[2];
var search = process.argv[3];

// use for loop to receive all the items one needs

function callCommands(command, search) {
	switch (command) {
		case 'help':
			helpFunction();
			break;
		case 'concert-this':
			concertThis(search);
			break;
		case 'spotify-this-song':
			spotifyThis(search);
			break;
		case 'movie-this':
			movieThis(search);
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
			helpFunction();
			break;
	}
}

// help function
function helpFunction() {
	console.log('--------------------------------------------------------------------------------');
	console.log(
		`Liri takes four commands. 'concert-this', 'spotify-this-song' 'movie-this', and 'do-what-it-says'. These commands do not require quotations. However, their inputs do require quotations. For example: this-movie "It's a wonderful life".`
	);
	console.log('--------------------------------------------------------------------------------');
}

// concert-this command
function concertThis(search) {
	var url = 'https://rest.bandsintown.com/artists/' + search + '/events?app_id=codingbootcamp';

	axios
		.get(url)
		.then((response) => {
			for (var i = 0; i < 10; i++) {
				console.log('--------------------------------------------------------------------------------');
				console.log(`Venue: ${response.data[i].venue.name}`);
				console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
				console.log(`Date: ${moment(response.data[i].datetime).format('MM/DD/YYYY')}`);
				console.log('--------------------------------------------------------------------------------');
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

// if spotify-this-song command
function spotifyThis(search) {
	if (search === undefined) {
		// fuck this song
		search = 'The Sign';
	}
	spotify.search(
		{
			type: 'track',
			query: search
		},
		function(err, data) {
			if (err) {
				console.log('Error occurred: ' + err);
				return;
			}
			var response = data.tracks.items;

			for (var i = 0; i < response.length; i++) {
				console.log('--------------------------------------------------------------------------------');
				console.log(i);
				console.log(`Song Name: ${response[i].name}`);
				console.log(`Preview Song: ${response[i].preview_url}`);
				console.log(`Album: ${response[i].album.name}`);
				console.log(`Artist(s) ${response[i].artists[0].name}`);
				console.log('--------------------------------------------------------------------------------');
			}
		}
	);
}

// movie this command function
function movieThis(search) {
	let movieQueryURL = 'http://www.omdbapi.com/?t=' + search + '&y=&plot=short&apikey=trilogy';

	axios
		.get(movieQueryURL)
		.then(function(response) {
			if (response.data.Response === 'False') {
				console.log(
					"If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
				);
				console.log("It's on Netflix!");
			} else {
				console.log('--------------------------------------------------------------------------------');
				console.log(`Title: ' + ${response.data.Title}`);
				console.log('Year: ' + response.data.Year);
				console.log('IMDB Rating: ' + response.data.imdbRating);
				console.log('Rotten Tomatoes: ' + response.data.Ratings[1].Value);
				console.log('Country: ' + response.data.Country);
				console.log('Language: ' + response.data.Language);
				console.log('Plot: ' + response.data.Plot);
				console.log('Actors: ' + response.data.Actors);
				console.log('--------------------------------------------------------------------------------');
			}
		})
		.catch(function(error) {
			console.log(error);
		});
}

// *****************************************************
// do-what-it-says
function doWhatItSays() {
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		var dataArr = data.split(',');
		callCommands(dataArr[0], dataArr[1]);
	});
}

callCommands(command, search);
