let myWeather = new Array();
let dataReady = false;

$( document ).ready(function() {	
	(function() {
		let openWeatherAPI = "http://api.openweathermap.org/data/2.5/forecast?q=Bremen,de&units=metric&appid=cb2ad13cb0c469a6d1e1f48f8c35d52b";
		$.getJSON( openWeatherAPI, {})
		.done(function( data ) {
			console.log(data);
			// 9:00
			myWeather[0] = new Weather(data.list[0].dt, data.list[0].weather[0].main, data.list[0].rain["3h"], data.list[0].wind.speed, data.list[0].main.humidity, data.list[0].main.temp);

			// 15:00
			myWeather[1] = new Weather(data.list[2].dt, data.list[2].weather[0].main, data.list[2].rain["3h"], data.list[2].wind.speed, data.list[2].main.humidity, data.list[2].main.temp);

			// 18:00
			myWeather[2] = new Weather(data.list[3].dt, data.list[3].weather[0].main, data.list[3].rain["3h"], data.list[3].wind.speed, data.list[3].main.humidity, data.list[3].main.temp);
			dataReady = true;
		});
	})();

	class Weather {
		constructor (time, weatherDescription, rain3h, windSpeed, humidity, temperature) {
			this.time = time;
			this.weatherDescription = weatherDescription;
			this.rain3h = rain3h;
			this.windSpeed = windSpeed;
			this.humidity = humidity;
			this.temperature = temperature;
		}

		isRaining () {
			let descriptions = ["Rain", "Snow", "Thunderstorm", "Drizzle"];
			if (descriptions.includes(this.weatherDescription)) {
				return true;
			}
			return false;
		}

		isCloudy() {
			let descriptions = ["Rain", "Snow", "Thunderstorm", "Drizzle"];
			if (descriptions.includes(this.weatherDescription)) {
				return true;
			}
			return false;
		}
	}
})
