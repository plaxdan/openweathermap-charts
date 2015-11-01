require('../css/style');
var weather = require('./openweathermap');

var cityList = document.getElementById('cityList');

/**
 * Creates a DOM element with the given attributes
 */
var createElement = function(tag, attributes) {
  var element = document.createElement(tag);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
};

/**
 * Higher order function that returns a function for adding children to the
 * given DOM parent.
 */
var childAdder = function(parent) {
  // Return a function that creates a closure over the parent variable.
  return function(child) {
    parent.appendChild(child);
  };
};

var visualizeCity = function(data) {
  console.log(data);
};

var cityNotFound = function(err) {
  console.error('Error fetching city', err);
};

var onClickCity = function(clickEvent) {
  var chosenCity = clickEvent.target.innerText;
  var cityListItems = [...cityList.childNodes];
  // Remove className='active' from all items
  cityListItems.forEach(function(item) {item.className = ''});
  // Add className='active' to selected item
  clickEvent.target.parentNode.className = 'active';
  console.debug(`Fetching data for ${chosenCity}...`);
  var fetchCity = weather.dailyForecast(chosenCity);
  fetchCity.then(visualizeCity);
  fetchCity.catch(cityNotFound);
};

/**
 * Set up the tabs for choosing cities.
 */
var initializeCities = function(cities) {
  var makeCity = function(city) {
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
var run = function() {
  var cities = ['Denver', 'London', 'Tokyo'];
  initializeCities(cities);
}

weather.dailyForecast('Phoenix', {cnt: 2});

// Let's go!
run();
