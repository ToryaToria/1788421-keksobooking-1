
import { loadMap } from './add-map-leaflet.js';
import { getData } from './api.js';
import { initFilter } from './filters.js';
import { activeFilter, activeForm, formDisabled } from './form-disabled.js';
import { initFofm } from './form-submit.js';
import { showAlert } from './show-message.js';

formDisabled();
loadMap()
  .then(() => {
    activeForm();
    initFofm();
    getData()
      .then((data) => {
        initFilter(data);
        activeFilter();
      })
      .catch((err) => {
        showAlert(err.message);
      });
  })
  .catch((err) => {
    showAlert(err.message);
  });
