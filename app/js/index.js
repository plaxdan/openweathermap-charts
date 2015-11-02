require('../css/style');

// This is our custom weather API.
var weather = require('./openweathermap');
var chartist = require('./chartist');
var map = require('./map')('map');

// This is the <ul> list for cities.
var cityList = document.getElementById('cityList');

/**
 * Creates a DOM element with the given attributes.
 *
 * @param {String} tagName - The tag of the HTML element to create.
 * @param {Object} attributes - An object containing the key/value pairs for
 *  the HTML elements attributes
 * @return {HTMLElement} - the element with the given tag and attributes.
 */
var createElement = (tagName, attributes) => {
  var element = document.createElement(tagName);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
};

/**
 * Clears the 'active' class from all the city buttons.
 *
 * @return {undefined}
 */
var clearActive = () => {
  // This destructuring trick is a handy way of converting an Array-like
  // object into an actual array.
  [...cityList.childNodes]
    // Now it's converted, we can use the .forEach function of Array!
    .forEach((item) => item.className = '');
}

/**
 * Higher order function.
 *
 * @return {Function} A function for adding children to the given DOM parent.
 */
var childAdder = (parent) => {
  // Return a function that creates a closure over the parent variable.
  return (child) => parent.appendChild(child);
};

/**
 * Converts an Open Weather Map payload into Chartist data. This converter
 * could be part of a suite of conversion functions that translate between
 * Open Weather Map services and visualizers for specific datasets.
 *
 * @param {Object} payload - The Open Weather Map payload.
 * @return {Object} A Chartist data set for max and min temperatures.
 */
var temperatureChartData = (payload) => {
  var payloadReducer = (prev, day) => {
    prev.labels.push(`Day ${prev.labels.length + 1}`);
    var max = prev.series.find((item) => item.name === 'max');
    var min = prev.series.find((item) => item.name === 'min');
    max.data.push(day.temp.max);
    min.data.push(day.temp.min);
    return prev;
  };
  return payload.list
    .reduce(payloadReducer, chartist.initialTempData());
}

/**
 * Converts weather payload to chart data then renders it to a chart.
 *
 * @param {Object} payload -The Raw Open Weather Map data.
 * @return {undefined}
 */
var visualizeTemperatures = (payload) => {
  // TODO: perhaps display the current weather (Cloudy, Sunny etc).
  // Display as text or perhaps as icons?
  console.debug('Raw data', payload);
  const chartData = temperatureChartData(payload)
  console.debug('Chart data', chartData);
  chartist.render('temps', chartData);
};

var visualizeMap = (payload) => {
  var {lat, lon} = payload.city.coord;
  map.setPosition(lat, lon);
};

var handleFetchError = (err) => {
  console.error('Error fetching city', err);
};

var handleVisualizationError = (err) => {
  console.error('Error visualizing city', err);
};

var onClickCity = (clickEvent) => {
  var a = clickEvent.target; // The <a/> tag is the click target

  clearActive();
  a.parentNode.className = 'active';

  // TODO: Allow the user to choose the number of days in the forecast
  const chosenCity = a.innerText;
  const numberOfDays = 10; // 10-day forecast
  var fetchCity = weather.dailyForecast(chosenCity, {count: numberOfDays});
  fetchCity.catch(handleFetchError);

  fetchCity
    .then(visualizeMap)
    .catch((err) => console.error('Error rendering map', err));

  // TODO: Add more charts and graphics based on the data.
  fetchCity
    .then(visualizeTemperatures)
    .catch(handleVisualizationError);
};

/**
 * Set up the tabs for choosing cities.
 */
var initializeCities = (cities) => {
  var makeCity = (city) => {
    var li = createElement('li', {role: 'presentation'});
    var a = createElement('a', {href: `#${city}`});
    a.innerText = city;
    li.appendChild(a);
    li.addEventListener('click', onClickCity);
    return li;
  }
  cities
    .map(makeCity)
    .forEach(childAdder(cityList));
}

/**
 * Run the application
 */
var run = () => {
  // TODO: Allow the user to add/remove cities themselves.
  var cities = ['Boston', 'Philadelphia', 'Denver', 'London', 'Tokyo', 'Shanghai', 'Phoenix', 'Malibu'];

  // TODO: Try initializing the currently selected city list
  // from the window.location.hash value. Make the forward/backward browser
  // buttons work for the user.
  // See: https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange
  initializeCities(cities);
}

// Let's go!
run();
