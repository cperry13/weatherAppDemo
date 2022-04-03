var request  = require('request');

let weather= (city, callback) => {
	// get the url
	var url = 'http://api.weatherstack.com/current?access_key=b2eb138637e83db4470f52440b960872&query='+ city +'&units=f';
	
	request({url: url, json: true}, (error, response) => {
		if(error)
		{
			//low level error
			callback("Unable to connect to the Weather API");
		}
		else if(response.body.error)
		{
			//checks to see if we have an api level error
			callback(`${response.body.error.info}`);
		}
		else
		{
			// if there is no error, generate the data to the callback
			callback(undefined, {
				currentCity: response.body.location.name,
				currentState: response.body.location.region,
				currentDescription: response.body.current.weather_descriptions[0],
				currentTemp: response.body.current.temperature,
				feelsLikeTemp: response.body.current.feelslike,
				lat: response.body.location.lat,
				lon: response.body.location.lon,
				time: response.body.location.localtime
			});
		}
	});
};

// let weather= (city, callback) => {
	// // get the url
	// var url = 'http://api.weatherstack.com/current?access_key=b2eb138637e83db4470f52440b960872&query='+ city +'&units=f';
	
	// request({url: url, json: true}, (error, {body}) => {
		// if(error)
		// {
			// //low level error
			// callback("Unable to connect to the Weather API");
		// }
		// else if(body.error)
		// {
			// //checks to see if we have an api level error
			// callback(`${body.error.info}`);
		// }
		// else
		// {
			// // if there is no error, generate the data to the callback
			// callback(undefined, {
				// currentCity: body.location.name,
				// currentState: body.location.region,
				// currentDescription: body.current.weather_descriptions[0],
				// currentTemp: body.current.temperature,
				// feelsLikeTemp: body.current.feelslike,
				// lat: body.location.lat,
				// lon: body.location.lon,
				// time: body.location.localtime
			// });
		// }
	// });
// };

module.exports = weather;