import {
  DwellingOptions,
  СapaCityOptions,
  SLIDER_MAX,
  MIN_TITLE,
  MAX_TITLE
} from './constants.js';

const adForm = document.querySelector('.ad-form');
const fildTitle = adForm.querySelector('#title');
const fildPrice = adForm.querySelector('#price');

const dwellingType = adForm.querySelector('#type');
const dwellingPrice = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capaCity = adForm.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'error-pristine'
}
);

// функция проверки длины поля "Заголовок"
function validateNickname(value) {
  return value.length >= MIN_TITLE && value.length <= MAX_TITLE;
}

// функция проверки максимума поля "Цена"
function validatePrice(price) {
  if (!price.length){
    return true;
  }
  return price <= SLIDER_MAX;
}

// функция проверки соответствия полей "тип жилья" и "цена"
function validateDwellingTypePrice() {
  return dwellingPrice.value >= DwellingOptions[dwellingType.value];
}

// функция генерации сообщения об ошибке для ф-ции validateDwellingTypePrice
function getDwellingErrorMessage() {
  return `Минимальная цена ${DwellingOptions[dwellingType.value]} рублей`;
}

// функция для обработчика события "change" на поле "Тип жилья"
function onDwellingTypeChange() {
  dwellingPrice.placeholder = DwellingOptions[this.value];
}

//================================
// функции синхронизации полей "заезд" и "выезд" - повесить на "change" для полей "заезд" и "выезд"
function timingInOut() {
  timeOut.value = timeIn.value;
}

function timingOutIn() {
  timeIn.value = timeOut.value;
}

timeIn.addEventListener('change', timingInOut);
timeOut.addEventListener('change', timingOutIn);

//================================
// ф-ция проверки соответствия поля "кол-во гостей"
function validatecapaCity() {
  return СapaCityOptions[roomNumber.value].includes(capaCity.value);
}

// функция генерации сообщения об ошибке для ф-ции validatecapaCity
function getcapaCityErrorMessage() {

  if (roomNumber.value !== '100' && capaCity.value === '0') {
    return 'Нельзя выбрать "Не для гостей!"';
  }

  switch (roomNumber.value) {
    case '1':
      return 'Не больше 1 гостя!';

    case '2':
      return 'Не больше 2 гостей!';

    default:
      return 'Можно выбрать только "Не для гостей!"';
  }
}

//++++++++++++ ПРОВЕРКИ +++++++++++++++++
// проверка поля "Заголовок"
pristine.addValidator(
  fildTitle,
  validateNickname,
  `Заголовок от ${MIN_TITLE} и до ${MAX_TITLE} символов`
);

// проверка максимума поля "Цена"
pristine.addValidator(
  fildPrice,
  validatePrice,
  `Цена не может быть больше ${SLIDER_MAX} рублей`,
  1
);

// проверка соответствия полей "тип жилья" и "цена"
pristine.addValidator(
  fildPrice,
  validateDwellingTypePrice,
  getDwellingErrorMessage,
  2
);

// проверка соответствия полей "кол-во комнат" и "кол-во мест"
pristine.addValidator(
  capaCity,
  validatecapaCity,
  getcapaCityErrorMessage
);
//+++++++++++++++++++++

dwellingType.addEventListener('change', onDwellingTypeChange);

const pristineReset = () => pristine.reset();
const pristineIsValid = () => pristine.validate();

export {
  pristineReset,
  pristineIsValid
};
