const {
  API_KEY, URL_DAILY_FORECAST
} = require('../../openweathermap.config.js');

// Export an object representing our API.
const API = () => {

  // Internal cache.
  // The API object's functions create closures around this.
  const CACHE = {};

  // The actual API object.
  // TODO :build out this API. How would you make it more reusable and capable?
  return {

    /**
     * Asynchronously fetches the forcast for the given city from the network
     * or from a cache.
     *
     * @param {String} cityName - the name of the city to return forecast data for.
     * @param {Object} options -
     *  units: weather units - defaults to 'metric'
     *  count: number of days to fetch - defaults to 5
     *
     * @return: {Promise} A Promise that resolves with JSON forecast data.
     */
    dailyForecast: (cityName, {units = 'metric', count = 5} = {}) => {
      const url = `${URL_DAILY_FORECAST}${cityName}&units=${units}&cnt=${count}&appid=${API_KEY}`
      if (CACHE[url]) {
        // TODO: as an exercise, make each item in the cache expire after
        // a number of minutes. Make it possible to configure the API with
        // a specific cache-timeout number. The items should time-out
        // individually rather than having the entire cache timeout at once.
        console.info(`CACHED - ${cityName}`)
        return Promise.resolve(CACHE[url]); // Always return a Promise
      } else {
        // New Promise-based fetch() API replaces XMLHttpRequest
        // See: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
        return fetch(url)
          .then((response) => response.json()) // return is implicit for one-line functions
          .then((json) => {
            console.info(`NETWORK - ${cityName}`)
            CACHE[url] = json;
            return json;
          });
      }
    }
  };
};

module.exports = API();
