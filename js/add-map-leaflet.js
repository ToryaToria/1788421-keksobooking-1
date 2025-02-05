import { createTemplate } from './create-template.js';

import { formActivForm } from './form-disabled.js';

const fieldAddrwss = document.querySelector('#address');

const myMap = L.map('map-canvas')
  .on('load', () => {
    // console.log('Карта инициализирована');
    formActivForm();
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  },
  12
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
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainIcon,
  }
);

mainMarker.addTo(myMap);

fieldAddrwss.value = `широта: ${mainMarker.getLatLng().lat},   долгота: ${mainMarker.getLatLng().lng}`;

mainMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();

  const lat = address.lat.toFixed(5);
  const lng = address.lng.toFixed(5);

  // добваить координаты в поле
  fieldAddrwss.value = `широта: ${lat},   долгота: ${lng}`;
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
  // console.log(typeof lat, lng);
  // console.log(point);

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
  mainMarker.setLatLng({
    lat: 35.6895,
    lng: 139.692,
  });

  myMap.setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);
};

export {
  createMarker,
  mapOnset
};
