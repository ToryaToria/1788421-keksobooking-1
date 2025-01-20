import {
  DwellingArray
} from './generate-dwelling.js'

import {
  createThumbnail,
} from './htumbnial.js'

import {
  formActiv
} from './form-disabled.js'


const fieldAddrwss = document.querySelector('#address');

const myMap = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована');
    // активация формы
    formActiv();

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

// создание иконки
const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// создание маркера
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

  console.log(address);
  console.log(address.lat);

  const lat = address.lat.toFixed(5);
  const lng = address.lng.toFixed(5);

  // добваить координаты в поле
  fieldAddrwss.value = `широта: ${lat},   долгота: ${lng}`;
});

console.log(DwellingArray);

const icon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(myMap);

// const createCustomPopup = ({lat, lng, title}) => `<section class="balloon">
// <h2>Шаблонная строка!<h2>
//   <h3 class="balloon__title">${title}</h3>
//   <p class="balloon__lat-lng">Координаты: ${lat}, ${lng}</p>
// </section>`;

const createMarker = (point) => {
  const lat = point.adress.lat;
  const lng = point.adress.lng;
  console.log(typeof lat, lng);

  const marker = L.marker(
    {
      lat,
      lng,
    },
    { icon, },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createThumbnail(point));
  // .bindPopup(createCustomPopup(point))
};

DwellingArray.forEach((point) => {
  createMarker(point);
});


