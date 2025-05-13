import { ALERT_SHOW_TIME,
  NOT_FOUND_OFFERS_DELAY
 } from './constants.js';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const successMessage = document.querySelector('#success').content.querySelector('.success');

const errorMessage = document.querySelector('#error').content.querySelector('.error');

const errorBtn = errorMessage.querySelector('.error__button');

const body = document.querySelector('body');

const showAlert = (errMessage) => {
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

let messageElem = successMessage;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onMessageHide();
  }
};

function onMessageHide() {
  messageElem.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onMessageHide);
}

const showSuccessMessage = () => {
  messageElem = successMessage;

  body.append(messageElem);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onMessageHide);

};

const showErrorMessage = () => {
  messageElem = errorMessage;

  body.append(messageElem);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onMessageHide);
  errorBtn.addEventListener('click', onMessageHide);
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

export {
  showAlert,
  showSuccessMessage,
  showErrorMessage,
  showNotFoundOffersMessage
};
