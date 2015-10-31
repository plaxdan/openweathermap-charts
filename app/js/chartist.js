require('chartist/dist/chartist.min.css');
var Chartist = require('chartist/dist/chartist.min.js');


// Initialize a Line chart in the container with the ID chart1
module.exports = {
  render: function() {
    new Chartist.Line('#chart1', {
      labels: [1, 2, 3, 4],
      series: [[100, 120, 180, 200]]
    });
  }
};
