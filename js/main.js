// import './form-disabled.js' ;

import './valid-form.js';
// import './add-map-leaflet.js' ;
import './slider-price.js';

import { showAlert } from './show-message.js';
import { getData } from './api.js';
import { createMarker } from './add-map-leaflet.js';

import { DWELLING_COUNT_MAX } from './constants.js';
import { formActivFilter } from './form-disabled.js';

import './submit-form.js';

try {
  const data = await getData();
  formActivFilter();
  console.log(data);

  const DwellingArray = data.slice(0, DWELLING_COUNT_MAX);

  DwellingArray.forEach((point) => {
    createMarker(point);
  });

} catch (err) {
  showAlert(err.message);
}
