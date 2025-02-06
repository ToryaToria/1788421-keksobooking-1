// import { data } from "./main";

import { showAlert } from './show-message.js';
import { getData } from './api.js';
import { createMarker } from './add-map-leaflet.js';

import { DWELLING_COUNT_MAX } from './constants.js';
import { formActivFilter } from './form-disabled.js';

//=================

const Prices = {
  low: 10000,
  high: 50000
}

const filters = document.querySelector('.map__filters');

const housingType = filters.querySelector('#housing-type');

const housingPrice = filters.querySelector('#housing-price');

const housingRooms = filters.querySelector('#housing-rooms');

const housingGuests = filters.querySelector('#housing-guests');

const housingFeatures = filters.querySelector('#housing-features');

let housingDataArray = [];

try {
  const data = await getData();
  formActivFilter();

  const DwellingArray = data.slice(0, DWELLING_COUNT_MAX);

  DwellingArray.forEach((point) => {
    createMarker(point);
  });

  housingDataArray = structuredClone(data);

} catch (err) {
  showAlert(err.message);
}

console.log(housingDataArray);

//1. фильтрация по типу жилья
const onFilterTypeChange = () => {
  let filterType = [];

  if (housingType.value === 'any') {
    filterType = housingDataArray
    console.log(housingType.value);
    console.log(filterType);
    return filterType;
  }

  filterType = housingDataArray.filter((item) => item.offer.type === housingType.value);
  console.log(housingType.value);
  console.log(filterType);
  return filterType
}

housingType.addEventListener('change', onFilterTypeChange);


// 2. фильтрация по цене
const onFilterPriceChange = () => {
  let price = housingPrice.value;
  let filterPrice = [];

  if (price === 'any') {
    filterPrice = housingDataArray;
    console.log(price)
    console.log(filterPrice);
    return filterPrice;
  }

  switch (price) {
    case 'middle':
      filterPrice = housingDataArray.filter((item) => item.offer.price > Prices.low && item.offer.price < Prices.high);

      console.log(price)
      console.log(filterPrice);

      return filterPrice;

    case 'low':
      filterPrice = housingDataArray.filter((item) => item.offer.price <= Prices.low);

      console.log(price)
      console.log(filterPrice)

      return filterPrice;

    case 'high':
      filterPrice = housingDataArray.filter((item) => item.offer.price >= Prices.high);
      
      console.log(price)
      console.log(filterPrice)

      return filterPrice;
  }
}

housingPrice.addEventListener('change', onFilterPriceChange);

// 3. фильтрация по комнатам
const onFilterRoomsChange = () => {
let filterRooms = [];

  if (housingRooms.value === 'any') {
    filterRooms = housingDataArray;
    console.log(housingRooms.value)
    console.log(filterRooms);
    return filterRooms;
  }

   filterRooms = housingDataArray.filter((item) => item.offer.rooms === Number(housingRooms.value));
  console.log(housingRooms.value);
  console.log(filterRooms);
  return filterRooms;
}

housingRooms.addEventListener('change', onFilterRoomsChange);

// 4. фильтрация по гостям
const onFilterGuestsChange = () => {
  let filterGuests = [];

  if (housingGuests.value === 'any') {
    filterGuests = housingDataArray;
    console.log(housingGuests.value)
    console.log(filterGuests);
    return filterGuests;
  }

  filterGuests = housingDataArray.filter((item) => item.offer.guests === Number(housingGuests.value));

  console.log(housingGuests.value);
  console.log(filterGuests);
  return filterGuests;
}

housingGuests.addEventListener('change', onFilterGuestsChange);

// 5. фильтрация по удобствам

const onFilterFeaturesChange = (evt) => {
  let filterFeatures = [];

  const effect = evt.target.value;

  filterFeatures = housingDataArray.filter((item) => item.offer.features === effect);

  console.log(effect);
  console.log(filterFeatures);
  return filterFeatures;

  // const onEffectsChange = (evt) => {
  //   const effect = evt.target.value;
  //   chosenEffect = EFFECTS.find((elem) => elem.name === effect);
  //   setSlider();
  //   setImgStyle();
  // };


}

housingFeatures.addEventListener('change', onFilterFeaturesChange);


