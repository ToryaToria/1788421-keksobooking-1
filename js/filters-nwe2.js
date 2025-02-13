import { showAlert } from './show-message.js';
import { getData } from './api.js';
import { createMarker } from './add-map-leaflet.js';

import { 
  DWELLING_COUNT_MAX,
  NOT_FOUND_OFFERS_DELAY
 } from './constants.js';
import { formActivFilter } from './form-disabled.js';
import {debouncedRenderMarkers,
  renderSimilarMarkers
} from './add-map-leaflet.js'
//=================

// const Prices = {
//   low: 10000,
//   high: 50000
// }

const priceFilter = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: 1000000,
  },
};

const body = document.body;

const filtersForm = document.querySelector('.map__filters');

const housingType = filtersForm.querySelector('#housing-type');

const housingPrice = filtersForm.querySelector('#housing-price');

const housingRooms = filtersForm.querySelector('#housing-rooms');

const housingGuests = filtersForm.querySelector('#housing-guests');

const housingFeatures = filtersForm.querySelector('#housing-features');

const checkboxFeatures = housingFeatures.querySelectorAll('.map__checkbox');

let housingDataArray = [];

try {
  const data = await getData();
  formActivFilter();

  const DwellingArray = data.slice(0, DWELLING_COUNT_MAX);

  DwellingArray.forEach((point) => {
    createMarker(point);
  });

  renderSimilarMarkers(DwellingArray);

  housingDataArray = structuredClone(data);
  // console.log(housingDataArray);

} catch (err) {
  showAlert(err.message);
}

const resetFilters = () => {filtersForm.reset();
  const filteredData = setFilters();
  console.log(filteredData);
  renderSimilarMarkers(housingDataArray.slice(0, DWELLING_COUNT_MAX));

};

console.log(housingDataArray);

const filterByType = (item) => {
  const value = housingType.value;
  if (value === 'any') {
    return true;
  }
  return value === item.offer.type;
};

const filterByPrice = (item) => {
  const value = housingPrice.value;
  if (value === 'any') {
    return true;
  }
  return item.offer.price >= priceFilter[value].start && item.offer.price <= priceFilter[value].end;
};

const filterByRoom = (item) => {
  const value = housingRooms.value;
  if (value === 'any') {
    return true;
  }
  return +value === item.offer.rooms;
};

const filterByGuest = (item) => {
  const value = housingGuests.value;
  if (value === 'any') {
    return true;
  }
  return +value === item.offer.guests;
};

const filterByFeatures = (item) => {
  const checkedFeatures = Array.from(checkboxFeatures)
    .filter((feature) => feature.checked);

  return checkedFeatures.every((feature) => {
    if (!item.offer.features) {
      return false;
    }
    return item.offer.features.includes(feature.value);
  });
};

const setFilters = () => {
  const filteredData = housingDataArray.filter((item) =>
    filterByType(item) &&
    filterByPrice(item) &&
    filterByRoom(item) &&
    filterByGuest(item) &&
    filterByFeatures(item)
  ).slice(0, DWELLING_COUNT_MAX);

  if (filteredData.length === 0){
    showNotFoundOffersMessage();

  }


  debouncedRenderMarkers(filteredData);
  // console.log(filteredData);
  return filteredData
}

const showNotFoundOffersMessage = () => {
  const divEl = document.createElement('div');
  divEl.classList.add('no-simmilar-offers');
  divEl.textContent = 'Подходящих обьявлений не найдено. Попробуйте изменить фильтры поиска';
  body.append(divEl);

  setTimeout(() => {
    divEl.remove();
  }, NOT_FOUND_OFFERS_DELAY);
};

console.log(setFilters())

filtersForm.addEventListener('change', setFilters);

export {
  resetFilters
}