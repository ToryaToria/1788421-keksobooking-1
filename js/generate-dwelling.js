// dwelling  - жилище

const NAME = [
	'Дворец',
	'Квартира',
	'Дом',
	'Бунгало',
	'Отель'
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

const DWELLING_COUNT_MAX = 15;

const LAT_COUNT_MIN = 35.65000;
const LAT_COUNT_MAX = 35.70000;

const LNG_COUNT_MIN = 139.70000;
const LNG_COUNT_MAX = 139.80000;

const DIGIT = 5;

// генератор id для аватара, сквозная нумерация начиная с 1
function createIdGenerator() {
  let namId = 0;
  // функция с замыканием
  return () => {
    namId = +namId + 1;

		if (namId <= 9 ) {
			namId = '0' + namId;
		}
		// console.log('namId = ' + namId);
    return namId;
  };
}

let ava_index = createIdGenerator();

// функция генерации случайного числа из заданного диапазона
const getRandomInteger = (a, b) => {
	const lower = Math.ceil(Math.min(a, b));
	const upper = Math.floor(Math.max(a, b));
	const result = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

// генератор [min, max] для чисел с плавающей точкой до digit знаков
function getRandomIntPointFloat(a, b, digits = 1) {

	a = Math.abs(a); //  берем по модулю, для отсечения отрицательных значений
	b = Math.abs(b);
	digits = Math.abs(digits);

	let min = Math.min(a, b); //  находим мин и макс, если пользователь ввел диапозон не в том порядке
	let max = Math.max(a, b);

	return +(Math.random() * (max - min) + min).toFixed(digits); // Максимум включаeтся, а минимум - нет; + - для преобразования строки в число
}

//функция для алгоритма тасования Фишера-Йетса
function shuffle(arr) {
	let newArr = [...arr];
	for (let i = newArr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]]; //  Волшебство деструктуризации массивов
	}
	return newArr;
}
// let eee = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log('shuffle = ' + shuffle(eee));

//функция получения случайного элемент из массива 
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// создание массива из перемешанных случайно элементов случайной длины не более длины исходного массива
const createRandomArray = (arr) => shuffle(arr).slice(0, getRandomInteger(1, arr.length));
// console.log('createRandomArray = '+ createRandomArray(eee));

// создание объекта с координатами - location 
const createLocation = () => ({
	lat: getRandomIntPointFloat(LAT_COUNT_MIN, LAT_COUNT_MAX, DIGIT),
	lng: getRandomIntPointFloat(LNG_COUNT_MIN, LNG_COUNT_MAX, DIGIT)
});
// console.log(createLocation());

// locality - вместо location, т.к. это слово зарезервировано
let locality = createLocation();

// создание объекта с жильём
const createDwelling = () => ({
	avatar: `photos/${ava_index()}.jpg`, // подумать как сделать "01" - пока работает не правильно ???
	offer: getRandomArrayElement(NAME),
	adress: {
		lat: locality.lat,
		lng: locality.lng
	},
	price: getRandomInteger(1, 100000), // до скольки ???
	type: getRandomArrayElement(TYPE),
	rooms: getRandomInteger(1, 20), // до скольки ???
	guests: getRandomInteger(1, 20), // до скольки ???
	checkin: getRandomArrayElement(CHECK),
	checkout: getRandomArrayElement(CHECK),
	features: createRandomArray(FEATURES), // значения не должны повторяться!!!
	description: getRandomArrayElement(DESCRIPTIONS),
	photos: createRandomArray(PHOTOS), // думай! значения не должны повторяться!!!
});

// console.log(createDwelling());

// создание массива объектов
const DwellingArray = Array.from({ length: DWELLING_COUNT_MAX }, (_, index) => createDwelling(index + 1));
console.log(DwellingArray);
