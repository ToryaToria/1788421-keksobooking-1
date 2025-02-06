import { ALERT_SHOW_TIME } from './constants.js';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const successMessage = document.querySelector('#success').content.querySelector('.success');

const errorMessage = document.querySelector('#error').content.querySelector('.error');

const errorBtn = errorMessage.querySelector('.error__button');

const body = document.querySelector('body');

const showAlert = (errMessage) => {
  alert('AAAAAAAAAAA!')
  const dataErrorElem = dataErrorTemplate.cloneNode(true);

  if (errMessage) {
    dataErrorElem.querySelector('.data-error__title').textContent = errMessage;
  }
  document.body.append(dataErrorElem);

  setTimeout(() => {
    dataErrorElem.remove();
  }, ALERT_SHOW_TIME
  );
};

//=======================

let messageElem = successMessage;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
};

function hideMessage() {
  messageElem.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', hideMessage);
}

const showSuccessMessage = () => {
  messageElem = successMessage;

  body.append(messageElem);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', hideMessage);

};

const showErrorMessage = () => {
  messageElem = errorMessage;

  body.append(messageElem);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', hideMessage);
  errorBtn.addEventListener('click', hideMessage);
};

export {
  showAlert,
  showSuccessMessage,
  showErrorMessage
};
