import {
  DwellingOptions,
  СapaCityOptions
} from './constants.js';

const MIN_TITLE = 30;
const MAX_TITLE = 100;
const MAX_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
const fildTitle = adForm.querySelector('#title');
const fildPrice = adForm.querySelector('#price');

const dwellingType = adForm.querySelector('#type');

const dwellingPrice = adForm.querySelector('#price');

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const roomNumber = adForm.querySelector('#room_number');

const capaCity = adForm.querySelector('#capacity');

//+++++++++++++++++++++++++++

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'error-pristine'
}
);

//++++++++++++++++++++++++++++++++++++++++++++++

// функция проверки длины поля "Заголовок"
function validateNickname(value) {
  return value.length >= MIN_TITLE && value.length <= MAX_TITLE;

  // return value.length <= MAX_TITLE;
}

// функция проверки максимума поля "Цена"
function validatePrice(prise) {
  return prise <= MAX_PRICE;
};

// функция проверки поля "Цена" - только цифры!
function validatePriceNumber(prise) {
  const numbPattern = /\d/.test(prise);
  return numbPattern;
}

//================================
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

// проверка цифр поля "Цена"
pristine.addValidator(
  fildPrice,
  validatePriceNumber,
  'Только цифры!',
  1
);

// проверка максимума поля "Цена"
pristine.addValidator(
  fildPrice,
  validatePrice,
  `Цена не может быть больше ${MAX_PRICE} рублей`,
  2
);

// проверка соответствия полей "тип жилья" и "цена"
pristine.addValidator(
  fildPrice,
  validateDwellingTypePrice,
  getDwellingErrorMessage,
  3
);

pristine.addValidator(
  dwellingType,
  validateDwellingTypePrice,
  getDwellingErrorMessage
);



// проверка соответствия полей "кол-во комнат" и "кол-во мест"
pristine.addValidator(
  capaCity,
  validatecapaCity,
  getcapaCityErrorMessage
);
//+++++++++++++++++++++

dwellingType.addEventListener('change', onDwellingTypeChange);

// // проверка при отправке формы
// adForm.addEventListener('submit', (evt) => {
//   // отменить действие по умолчанию
//   evt.preventDefault();

//   // alert('Форма!');

//   // запустить пристин
//   pristine.validate();
// });


const pristineReset = () => pristine.reset();
const pristineIsValid = () => pristine.validate();

export {
  pristineReset,
  pristineIsValid
};
