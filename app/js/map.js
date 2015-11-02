require('leaflet-providers');

module.exports = (domId) => {

  // TODO: Start the map at the users' current position using the
  // navigator.geolocation API.
  var initialCenter = [51.505, -0.09];
  var map = L.map(domId, {center: initialCenter, zoom: 3});

  // TODO: Allow the user to choose different tile providers.
  // See: https://leaflet-extras.github.io/leaflet-providers/preview/
  L.tileLayer.provider('Stamen.Watercolor').addTo(map);
  var currentPositionMarker = L.marker(initialCenter);

  return {
    setPosition: (lat, lng, zoom) => {
      console.log('Map moving to', {lat, lng});
      map.setView([lat, lng], zoom);//, zoom);
      currentPositionMarker.setLatLng(L.latLng(lat, lng));
      currentPositionMarker.addTo(map);
    }
  };

};
