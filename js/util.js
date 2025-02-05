// генератор id для аватара, сквозная нумерация начиная с 1
function createIdGenerator() {
	let namId = 0;
	// функция с замыканием
	return () => {
		namId = +namId + 1;

		if (namId <= 9) {
			return `0${namId}`;
		}
		return namId;
	};
}

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

	const min = Math.min(a, b); //  находим мин и макс, если пользователь ввел диапозон не в том порядке
	const max = Math.max(a, b);

	return +(Math.random() * (max - min) + min).toFixed(digits); // Максимум включаeтся, а минимум - нет; + - для преобразования строки в число
}

//функция для алгоритма тасования Фишера-Йетса
function shuffle(arr) {
	const newArr = [...arr];
	for (let i = newArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
		//  Волшебство деструктуризации массивов
	}
	return newArr;
}

//функция получения случайного элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// создание массива из перемешанных случайно элементов случайной длины не более длины исходного массива
const createRandomArray = (arr) => shuffle(arr).slice(0, getRandomInteger(1, arr.length));


export {
	createIdGenerator,
	getRandomInteger,
	getRandomIntPointFloat,
	getRandomArrayElement,
	createRandomArray
};
