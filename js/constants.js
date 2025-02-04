const BASE_URL = ' https://28.javascript.htmlacademy.pro/keksobooking';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Methods = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить страницу. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте еще раз'
};

const ALERT_SHOW_TIME = 2000;

const SubmitBtnText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...'
};

// ==================

const DwellingOptions = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const СapaCityOptions = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const TYPE_TRANSLATION = {
  palase: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const CHECK = [
  '12.00',
  '13.00',
  '14.00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// const PHOTOS = [
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
// ];

const DWELLING_COUNT_MAX = 10;

export {
  DwellingOptions,
  СapaCityOptions,

  TYPE_TRANSLATION,
  CHECK,
  FEATURES,

  DWELLING_COUNT_MAX,

  BASE_URL,
  Route,
  Methods,
  ErrorText,

  ALERT_SHOW_TIME,
  SubmitBtnText
};
