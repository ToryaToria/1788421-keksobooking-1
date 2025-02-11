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
  features: []
}

const Filters = {
  ['housing-type']: 'type',
  ['housing-price']: 'price',
  ['housing-rooms']: 'rooms',
  ['housing-guests']: 'guests',

  // ['filter-wifi']: 'wifi',
  // ['filter-dishwasher']: 'dishwasher', ['filter-parking']: 'parking',
  // ['filter-washer']: 'washer',
  // ['filter-elevator']: 'elevator',
  // ['filter-conditioner']: 'conditioner',
  // features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
}

const onFilterChange = (filtered, clicked, init) => {
  let filterArr = [];

  console.log('++++++++++++++++++++')
  console.log(clicked);
  console.log(filtered);
  console.log(init.type);

  let key = Filters[filtered];
  console.log(`key = ${key}`);
  console.log('++++++++++++++++++++')


  if (init.type === 'checkbox') {
    filterArr = onCheckboxChange(clicked);
    return filterArr;
  }

  if (filtered === 'housing-price') {
    filterArr = onFilterPriceChange();
    return filterArr;
  } else {
    filterArr = housingDataArray.filter((item) => item.offer[key] == clicked);
    return filterArr;
  }
}

const onCheckboxChange = (clicked) => {
  let filterArr = [];
  housingDataArray.forEach((elem) => {
    if (elem.offer.features) {
      // console.log(elem.offer.features);
      let tryElem = elem.offer.features.some((el) => el == clicked);
      // console.log(tryElem);

      if (tryElem) {
        filterArr.push(elem);
      }
    }
  }
  );
  // console.log(filterArr);
  return filterArr;
}

// 2. фильтрация по цене
const onFilterPriceChange = () => {
  let price = housingPrice.value;
  let filterPrice = [];

  switch (price) {
    case 'middle':
      filterPrice = housingDataArray.filter((item) => item.offer.price > Prices.low && item.offer.price < Prices.high);
      break

    case 'low':
      filterPrice = housingDataArray.filter((item) => item.offer.price <= Prices.low);
      break

    case 'high':
      filterPrice = housingDataArray.filter((item) => item.offer.price >= Prices.high);
      break
  }
  // console.log(price)
  // console.log(filterPrice);

  return filterPrice;
}

const createModel = (evt) => {
  let init = evt.target;
  const id = init.id;
  const click = init.value;

  let filterArr = [];

  console.log('=====================')
  console.log(`click = ${click}`)
  console.log(`id = ${id}`);
  console.log(init);
  console.log(`init.type = ${init.type}`);
  console.log('=====================')

  if (init.type === 'checkbox') {
    if (init.checked) {
      // model[id] = click;
      model.features.push(init.value)

    }
    if (!init.checked) {
      // delete model[id];
      let index = model.features.indexOf(init.value);
      model.features.splice(index, 1);
    }
  }

  else {
    if (click !== 'any') {
      model[id] = click;
    } else {
      delete model[id];
    }
  }

  console.log(model);

  filterArr = onFilterChange(id, click, init);

  console.log(filterArr);
}

// ==================

filters.addEventListener('change', createModel);