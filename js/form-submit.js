import {
  pristineIsValid,
  pristineReset
} from './form-valid.js';
import { sendData } from './api.js';
import {
  showSuccessMessage,
  showErrorMessage
} from './show-message.js';
import { SubmitBtnText } from './constants.js';
import { mapOnset } from './add-map-leaflet.js';
import { imgReset } from './add-photo.js';
import { resetFilters } from './filters.js';
import './slider-price.js';

const adForm = document.querySelector('.ad-form');
const submitButton = document.querySelector('.ad-form__submit');
const buttonReset = document.querySelector('.ad-form__reset');

const toggleSubmitBtn = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitBtnText.SUBMITTING : SubmitBtnText.IDLE;
};

const onButtonReset = (evt) => {
  evt.preventDefault();
  adForm.reset();
  imgReset();
  resetFilters();
  mapOnset();
  pristineReset();
};

adForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (pristineIsValid()) {
    toggleSubmitBtn(true);
    try {
      await sendData(new FormData(adForm));
      onButtonReset(evt);
      showSuccessMessage();

    } catch {
      showErrorMessage();
    }
    toggleSubmitBtn();
  }
});

const initFofm = () => {
  buttonReset.addEventListener('click', onButtonReset);
};

export {
  initFofm
};
