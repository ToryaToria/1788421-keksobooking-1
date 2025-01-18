

const TITLE = [
'Дом из бруса в 500 метрах от озера',
'Отапливаемый коттедж площадью 180 кв. м',
'Дом в конце улицы в тихом тупике',
'Жильё в деревне в экологически чистом районе',
'Оазис в центре города'
];

const DESCRIPTIONS = [
  'Величественный и изысканный дворец',
  'Дворец традиционно причисляют к елизаветинскому барокко',
  'Резиденция османских султанов',

  'Роскошная квартира вблизи кинотеатра ждет вас!',
  'Улучшенная планировка, в отличном состоянии', 'Квартира теплая, расположена на солнечной стороне.',
  'Убежище и источник вдохновения',
  'В деревенском доме есть свой особый шарм, который создает уют и гармонию',
  'Одноэтажное здание для одной семьи с большой террасой и реже мансардой',
  'Сочетает в себе уют домашнего очага и комфорт современной обстановки.',
  'Все номера выходят окнами на тихий закрытый двор'
];

const TYPE = [
  'palase',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const TYPE_TRANSLATION = {
	palase: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
}
  
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

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const DWELLING_COUNT_MAX = 5;

const LAT_COUNT_MIN = 35.65000;
const LAT_COUNT_MAX = 35.70000;

const LNG_COUNT_MIN = 139.70000;
const LNG_COUNT_MAX = 139.80000;

const DIGIT = 5;

export {
  TITLE,
  DESCRIPTIONS,
  TYPE,
	TYPE_TRANSLATION,
  CHECK,
  FEATURES,
  PHOTOS,
  DWELLING_COUNT_MAX,
  LAT_COUNT_MIN,
  LAT_COUNT_MAX,
  LNG_COUNT_MIN,
  LNG_COUNT_MAX,
  DIGIT
}