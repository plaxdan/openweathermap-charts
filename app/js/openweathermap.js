const {
  API_KEY, URL_DAILY_FORECAST
} = require('../../openweathermap.config.js');

// Export an object representing our API
const API = {

  /**
   * Fetches the forcast for the given city.
   *
   * cityName: the name of the city to return forecast data for.
   * options:
   *  units: weather units - defaults to 'metric'
   *  count: number of days to fetch - defaults to 5
   *
   * returns: A Promise that resolves with JSON forecast data.
   */
  dailyForecast: function(cityName, {units = 'metric', count = 5} = {}) {
    const url = `${URL_DAILY_FORECAST}${cityName}&units=${units}&cnt=${count}&appid=${API_KEY}`
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return json;
      });
  }
};

module.exports = API;
