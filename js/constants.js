const BASE_URL = ' https://25.javascript.htmlacademy.pro/keksobooking';

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

const SLIDER_MAX = 100000;
const SLIDER_MIN = 0;

const MIN_TITLE = 30;
const MAX_TITLE = 100;

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

const DWELLING_COUNT_MAX = 10;

const FileTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

const RERENDER_DELAY = 500;
const NOT_FOUND_OFFERS_DELAY = 3000;


export {
  DwellingOptions,
  СapaCityOptions,
  SLIDER_MAX,
  SLIDER_MIN,

  MIN_TITLE,
  MAX_TITLE,

  TYPE_TRANSLATION,
  CHECK,
  FEATURES,

  DWELLING_COUNT_MAX,

  BASE_URL,
  Route,
  Methods,
  ErrorText,

  ALERT_SHOW_TIME,
  SubmitBtnText,

  FileTypes,
  RERENDER_DELAY,
  NOT_FOUND_OFFERS_DELAY
};
