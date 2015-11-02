require('chartist/dist/chartist.min.css');
var Chartist = require('chartist/dist/chartist.min.js');

const CHARTS_CACHE = {};

module.exports = {

  /**
   * Renders the data to a chart at the given DOM node ID. If a chart already
   * exists on that DOM node it will be updated with the new data.
   *
   * @param {String} elementId - The ID of the DOM element to attach the chart to.
   * @param {Object} data - The data to populate the Chartist chart.
   * @returns {HTMLElement} The DOM element which the chart is attached to.
   */
  render: (elementId, data) => {
    var chart = CHARTS_CACHE[elementId];
    if (chart) {
      // update the existing chart
      console.debug(`Updating existing chart for ${elementId}`);
      CHARTS_CACHE[elementId].update(data);
    } else {
      console.info(`Creating new chart for #${elementId}`);
      var chartOptions = {fullWidth: true};
      // TODO: allow users to choose whether they want bar, line, or some other
      // kind of chart.
      CHARTS_CACHE[elementId] = new Chartist.Line(`#${elementId}`, data, chartOptions);
    }
    return CHARTS_CACHE[elementId];
  },

  /**
   * @returns {Object} An empty data object for visualizing temperature data. Callers
   * can then populate the empty object with live weather data.
   */
  initialTempData: () => {
    return {
      labels: [],
      series: [
        {name: 'max', data: []},
        {name: 'min', data: []}
      ]
    };
  }
};
