require('../css/style');
var content = require('./content');
document.write('It works from index.js');
document.write(content);

var chartistComponent = require('./chartist');
chartistComponent.render();

var weather = require('./openweathermap');
weather.dailyForecast('Phoenix', {cnt: 2});
