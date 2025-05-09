// переделаные фильтры
import {
  ANY,
  PriceFilter,
  FILTER,
  FEATURES_NAME,
  RERENDER_DELAY
} from './constants.js';
import {
  renderSimilarMarkers
} from './add-map-leaflet.js';

import { debounce } from './util.js';

const filterForm = document.querySelector('.map__filters')
let model = {};
let points = [];

const isSelectedAll = (value) => value === ANY || (Array.isArray(value) && !value.length);

const FilterSettings = {
  [FILTER.TYPE]: (data, value) => data.filter((item) => item.offer.type === value),
  [FILTER.PRICE]: (data, value) => data.filter((item) => item.offer.price >= PriceFilter[value].start && item.offer.price < PriceFilter[value].end),
  [FILTER.ROOMS]: (data, value) => data.filter((item) => Number(value) === item.offer.rooms),
  [FILTER.GUESTS]: (data, value) => data.filter((item) => Number(value) === item.offer.guests),
  [FILTER.FEATURES]: (data, value) => data.filter((item) => value.every((element) =>
    item.offer.features && Array.isArray(item.offer.features)
      ? item.offer.features.includes(element)
      : false))
}

const filterData = () => Object.keys(model).reduce((acc, key) =>
  isSelectedAll(model[key])
    ? acc :
    FilterSettings[key](acc, model[key]), points);

const updateModel = (name, value) => {
  if (name === FEATURES_NAME) {
    model[FILTER.FEATURES] = [];
    document.querySelectorAll('[name="features"]:checked').forEach((feature) => {
      model[FILTER.FEATURES].push(feature.value)
    });
  } else {
    model[name] = value;
  }
};

filterForm.addEventListener('change', ({ target }) => {
  updateModel(target.name, target.value)



  debounce(() => {
    console.log('debounce уже');
    renderSimilarMarkers(filterData().slice(0, 10));
  },
    RERENDER_DELAY);

  // renderSimilarMarkers(filterData().slice(0, 10))
});

export const initFilter = (data) => {
  console.log('filter');
  points = [...data];
};


export const resetFilters = () => {
  model = {};
  renderSimilarMarkers(points.slice(0, 10));
  filterForm.reset();
};

