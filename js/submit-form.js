import {pristineIsValid} from './valid-form.js'
import {sendData} from './api.js'
import {
  showSuccessMessage,
  showErrorMessage
} from './show-message.js'
import { SubmitBtnText } from './constants.js';

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
    alert('отправляю форму');
    try {
      await sendData(new FormData(adForm));
      showSuccessMessage();
    } catch {
      showErrorMessage();
    }
    toggleSubmitBtn();
  }
});