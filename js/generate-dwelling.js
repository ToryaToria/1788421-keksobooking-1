import {
	createIdGenerator,
	getRandomInteger,
	getRandomIntPointFloat,
	getRandomArrayElement,
	createRandomArray
} from './util.js';

import {
	TITLE,
	DESCRIPTIONS,
	TYPE,
	CHECK,
	FEATURES,
	PHOTOS,
	DWELLING_COUNT_MAX,
	LAT_COUNT_MIN,
	LAT_COUNT_MAX,
	LNG_COUNT_MIN,
	LNG_COUNT_MAX,
	DIGIT
} from './constants.js';

const createLocationLat = () => getRandomIntPointFloat(LAT_COUNT_MIN, LAT_COUNT_MAX, DIGIT);
const createLocationLng = () => getRandomIntPointFloat(LNG_COUNT_MIN, LNG_COUNT_MAX, DIGIT);

const ava_index = createIdGenerator();

// создание объекта с жильём
const createDwelling = () => ({
	avatar: `photos/user${ava_index()}.png`,
	title: getRandomArrayElement(TITLE),
		adress: {
		lat: createLocationLat(),
		lng: createLocationLng()
	},
	price: getRandomInteger(1, 100000), // до скольки ???
	type: getRandomArrayElement(TYPE),
	rooms: getRandomInteger(1, 20), // до скольки ???
	guests: getRandomInteger(1, 20), // до скольки ???
	checkin: getRandomArrayElement(CHECK),
	checkout: getRandomArrayElement(CHECK),
	features: createRandomArray(FEATURES),
	description: getRandomArrayElement(DESCRIPTIONS),
	photos: createRandomArray(PHOTOS),
});

// создание массива объектов
const DwellingArray = Array.from({ length: DWELLING_COUNT_MAX }, (_, index) => createDwelling(index + 1));
// console.log(DwellingArray);

export {
	DwellingArray
};
