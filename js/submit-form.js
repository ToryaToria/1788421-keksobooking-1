import {pristineIsValid} from './valid-form.js';
import {sendData} from './api.js';
import {
  showSuccessMessage,
  showErrorMessage
} from './show-message.js';
import { SubmitBtnText } from './constants.js';
import {mapOnset} from './add-map-leaflet.js';
import {imgReset} from './add-photo.js';
import {resetFilters} from './filters.js';

const adForm = document.querySelector('.ad-form');

const submitBtn = document.querySelector('.ad-form__submit');

const toggleSubmitBtn = (isDisabled) => {
  submitBtn.disabled = isDisabled;
  submitBtn.textContent = isDisabled ? SubmitBtnText.SUBMITTING : SubmitBtnText.IDLE;
};

adForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (pristineIsValid()) {
    toggleSubmitBtn(true);
    try {
      await sendData(new FormData(adForm));
      showSuccessMessage();
      adForm.reset();
      mapOnset();
      imgReset();
      resetFilters();

    } catch {
      showErrorMessage();
    }
    toggleSubmitBtn();
  }
});

const btnReset = document.querySelector('.ad-form__reset');

const noBtnReset = (evt) => {
  evt.preventDefault();
  mapOnset();
  adForm.reset();
  imgReset();
  resetFilters();
};

btnReset.addEventListener('click', noBtnReset);
