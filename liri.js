// require components from my .env file
require('dotenv').config();
// require spotify
var Spotify = require('spotify-web-api-node');
// require keys.js file
var keys = require('./keys.js');
// require Axios
var axios = require('axios');
// require fs
var fs = require('fs');
var moment = require('moment');
// create spotify variable for working key
var spotify = new Spotify(keys.spotify);

// write into txt file

function writeToTxt(obj) {
	fs.writeFile('log.json', JSON.stringify(obj), function(error) {
		if (error) {
			console.log(error);
		}
	});
}

// create function and then reformat the functions as an object

// set variable to line Command

var lineCommand = process.argv[2];

// four line commands
switch (lineCommand) {
	case 'concert-this':
		concertThis();
		break;
	case 'spotify-this-song':
		// call function
		break;
	case 'movie-this':
		// call function
		break;
	case 'do-what-it-says':
		// call function
		break;
}

// concert.this command

function concertThis() {
	var artist = lineCommand;
	var queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';

	axios.get(queryURL).then((response) => {
		var events = response.data;
		console.log(events);
	});
}
