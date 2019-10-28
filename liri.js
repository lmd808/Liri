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

// variables to hold input
var args = process.argv;
var command = process.argv[2];
var search = '';

// use for loop to rereive all the items one needs

for (let i = 3; i < args.length; i++) {
	if (1 > 3 && i < args.length) {
		search = `${search}+${args[i]}`;
	} else {
		search += args[i];
	}
}

function callCommands(command, search) {
	switch (command) {
		case 'concert-this':
			concertThis(search);
			break;
		case 'spotify-this-song':
			spotifyThisSong(search);
			break;
		case 'movie-this':
			movieThis(search);
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
	}
}

// concert-this command
function concertThis(search) {
	var url = 'https://rest.bandsintown.com/artists/' + search + '/events?app_id=codingbootcamp';

	axios
		.get(url)
		.then((response) => {
			for (var i = 0; i < 10; i++) {
				console.log('--------------------------------------------------------------------------------');
				console.log('Venue: ' + response.data[i].venue.name);
				console.log('Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.country);
				console.log('Date: ' + moment(response.data[i].datetime).format('MM/DD/YYYY'));
			}
		})
		.catch((error) => {
			console.log(error);
		});
}
callCommands(command, search);
