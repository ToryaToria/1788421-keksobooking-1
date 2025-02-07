// import { data } from "./main";

// import {
//   onFilterTypeChange,
//   onFilterPriceChange,
//   onFilterRoomsChange,
//   onFilterGuestsChange,
// } from './filters.js'

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

const checkboxFeatures = housingFeatures.querySelectorAll('input[type="checkbox"]');


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

let model = {
  ['housing-type']: 'any',
  ['housing-price']: 'any',
  ['housing-rooms']: 'any',
  ['housing-guests']: 'any',
  features: [],
}

// features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],

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

// объект с функциями для фильтров
const modelFilters = {
  ['housing-type']: onFilterTypeChange,
  ['housing-price']: onFilterPriceChange,
  ['housing-rooms']: onFilterRoomsChange,
  ['housing-guests']: onFilterGuestsChange,
  // features: [],
}

console.log(model);

const createModel = (evt) => {
  const id = evt.target.id;
  const click = evt.target.value;
  let init = evt.target;
  let n = 0;

  console.log(click)
  console.log(id);
  console.log(init.type);


  if (init.type === 'checkbox') {
    if (init.checked) {
      model.features.push(init.value)
    }

    if (!init.checked) {
      let index = model.features.indexOf(init.value);
      console.log(`удаление - ${index}`);
      model.features.splice(index, 1);
    }
  } else {
    model[id] = click;
    modelFilters[id]();
  }

  console.log(model);

  checkboxFeatures.forEach((elem) => {
    if (elem.checked) {
      n = n + 1;
    }
  })
  console.log(n);
}

// ==================

filters.addEventListener('change', createModel);