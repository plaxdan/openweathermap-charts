const {
  API_KEY, URL_DAILY_FORECAST
} = require('../../openweathermap.config.js');

// Export an object representing our API
const API = {

  /**
   * Fetches the 5-day forcast for the given city.
   */
  dailyForecast: function(cityName, {units = 'metric', cnt = 7} = {}) {
    return fetch(`${URL_DAILY_FORECAST}${cityName}&units=${units}&cnt=${cnt}&appid=${API_KEY}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.debug(`JSON for ${cityName}`, json);
      });
  }
};

module.exports = API;
