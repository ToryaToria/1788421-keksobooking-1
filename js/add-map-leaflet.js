import { createTemplate } from './create-template.js';
import { debounce } from './util.js';
import { formActivForm } from './form-disabled.js';
import {
  RERENDER_DELAY,
  LAT,
  LNG,
  ZOOM
} from './constants.js';

const fieldAddress = document.querySelector('#address');

const myMap = L.map('map-canvas')
  .on('load', () => {
    // console.log('карта загрузилась');
    formActivForm();
  })
  .setView({
    lat: LAT,
    lng: LNG,
  },
  ZOOM
  );

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(myMap);

const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  }
);

mainMarker.addTo(myMap);

fieldAddress.value = `${mainMarker.getLatLng().lat},   ${mainMarker.getLatLng().lng}`;

mainMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();

  const lat = address.lat.toFixed(5);
  const lng = address.lng.toFixed(5);

  fieldAddress.value = `${lat},   ${lng}`;
});
const icon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(myMap);

const createMarker = (point) => {
  const lat = point.location.lat;
  const lng = point.location.lng;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    { icon, },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(() => createTemplate(point));
};

const mapOnset = () => {
  // console.log('главный маркер')
  mainMarker.setLatLng({
    lat: LAT,
    lng: LNG,
  });

  fieldAddress.value = `${LAT},   ${LNG}`;

  myMap.setView({
    lat: LAT,
    lng: LNG,
  }, ZOOM);
};

const renderSimilarMarkers = (data) => {
  // console.log('рендер маркеров')
  markerGroup.clearLayers();
  myMap.closePopup();
  data.forEach((similarAd) => createMarker(similarAd));
};

const debouncedRenderMarkers = debounce((data) => renderSimilarMarkers(data), RERENDER_DELAY);

export {
  createMarker,
  mapOnset,
  debouncedRenderMarkers,
  renderSimilarMarkers
};
