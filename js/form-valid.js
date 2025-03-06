import {
  DwellingOptions,
  СapaCityOptions,
  SLIDER_MAX,
  MIN_TITLE,
  MAX_TITLE
} from './constants.js';

const adForm = document.querySelector('.ad-form');
const fieldTitle = adForm.querySelector('#title');
const fieldPrice = adForm.querySelector('#price');
const fieldType = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capaCity = adForm.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'error-pristine'
},
false
);

const validateNicknameMin = (value) => value.length >= MIN_TITLE;

const validateNicknameMax = (value) => value.length <= MAX_TITLE;

const validatePrice = (price) => {
  if (!price.length) {
    return true;
  }
  return price <= SLIDER_MAX;
};

const validateDwellingTypePrice = () => fieldPrice.value >= DwellingOptions[fieldType.value];

const getPriceErrorMessage = () => `Минимальная цена ${DwellingOptions[fieldType.value]} рублей`;

const getTypeErrorMessage = () => 'Тип жилья не соответствует цене';

const onDwellingTypeChange = (evt) => {
  fieldPrice.placeholder = DwellingOptions[evt.value];
};

fieldType.addEventListener('change', onDwellingTypeChange);

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChenge = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChenge);

const validatecapaCity = () => СapaCityOptions[roomNumber.value].includes(capaCity.value);

const getcapaCityErrorMessage = () => {
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
};

pristine.addValidator(
  fieldTitle,
  validateNicknameMin,
  `Заголовок не меньше ${MIN_TITLE} символов`,
  1
);

pristine.addValidator(
  fieldTitle,
  validateNicknameMax,
  `Заголовок не больше ${MAX_TITLE} символов`,
  2
);

pristine.addValidator(
  fieldPrice,
  validatePrice,
  `Цена не может быть больше ${SLIDER_MAX} рублей`,
  1
);

pristine.addValidator(
  fieldPrice,
  validateDwellingTypePrice,
  getPriceErrorMessage,
  2
);

pristine.addValidator(
  fieldType,
  validateDwellingTypePrice,
  getTypeErrorMessage
);

pristine.addValidator(
  capaCity,
  validatecapaCity,
  getcapaCityErrorMessage
);

const pristineReset = () => pristine.reset();
const pristineIsValid = () => pristine.validate();

export {
  pristineReset,
  pristineIsValid
};
