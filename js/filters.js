import {
  DWELLING_COUNT_MAX,
  NOT_FOUND_OFFERS_DELAY,
  PriceFilter,
  RERENDER_DELAY
} from './constants.js';
import {
  renderSimilarMarkers
} from './add-map-leaflet.js';
import { debounce } from './util.js';

const body = document.body;
const filtersForm = document.querySelector('.map__filters');
const housingType = filtersForm.querySelector('#housing-type');
const housingPrice = filtersForm.querySelector('#housing-price');
const housingRooms = filtersForm.querySelector('#housing-rooms');
const housingGuests = filtersForm.querySelector('#housing-guests');
const housingFeatures = filtersForm.querySelector('#housing-features');
const checkboxFeatures = housingFeatures.querySelectorAll('.map__checkbox');

let housingData = [];
let dwellings = [];

const initFilter = (data) => {
  housingData = [...data];
  dwellings = data.slice(0, DWELLING_COUNT_MAX);

  renderSimilarMarkers(dwellings);
};

const resetFilters = () => {
  filtersForm.reset();
  renderSimilarMarkers(dwellings);
};

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
  return item.offer.price >= PriceFilter[value].start && item.offer.price <= PriceFilter[value].end;
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

const showNotFoundOffersMessage = () => {
  const divElement = document.createElement('div');
  divElement.classList.add('no-simmilar-offers');
  divElement.textContent = 'Подходящих обьявлений не найдено. Попробуйте изменить фильтры для поиска';
  body.append(divElement);

  setTimeout(() => {
    divElement.remove();
  }, NOT_FOUND_OFFERS_DELAY);
};

const onFiltersChange = () => {
  const filteredData = housingData.filter((item) =>
    filterByType(item) &&
    filterByPrice(item) &&
    filterByRoom(item) &&
    filterByGuest(item) &&
    filterByFeatures(item)
  ).slice(0, DWELLING_COUNT_MAX);

  if (filteredData.length === 0) {
    showNotFoundOffersMessage();
  }

  renderSimilarMarkers(filteredData);
};

filtersForm.addEventListener('change', debounce(() => {
  onFiltersChange();
},
RERENDER_DELAY));

export {
  resetFilters,
  initFilter
};
