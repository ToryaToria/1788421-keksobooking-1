//  ++++++++++++ ДЗ-1 +++++++++++++

//1. проверка строки на палиндром
function checkingPalindrom(str) {
  let newStr;

  // нормализация строки
  newStr = str.replaceAll(' ', '');
  newStr = newStr.toLowerCase();

  const strNorm = newStr;

  // переворот строки
  // Преобразуем строку в массив
  newStr = newStr.split(''); // ['с', 'т', 'р', 'о', 'к', 'а']

  // Разворачиваем элементы массива
  newStr.reverse(); // ['а', 'к', 'о', 'р', 'т', 'с']

  // Преобразуем массив в строку
  newStr = newStr.join(''); // акортс

  if (strNorm === newStr) {
    console.log('строка:  \'' + str + '\' - палиндром');
    return true;
  }
  console.log('строка: \'' + str + '\' - не палиндром');
  return false;
}

const str1 = 'это просто строка';
const str4 = 'А роза упала на лапу Азора';

console.log('тест1: палиндром')
checkingPalindrom(str4);

console.log('тест2: не палиндром')
checkingPalindrom(str1);


//2. вынимаем цифры из строки

function removeNumbersFromString(str) {

  if (typeof str === 'number') {
    str = String(str); // превращаю число в строку
  }

  let num = 0;
  num = parseInt(str.replace(/\D+/g, ''), 10); // заменить в строке всё что не цифры (\D) на ''  и преобразовать в число.

  // let num = str.replace(/\D+/g, ''); // заменить в строке всё что не цифры (\D) на ''  и преобразовать в число.
  // num = parseInt(str, 10);
  // console.log('num: ' + num);

  return num;
};

  const str5 = 'фываыфвп 1234 вапрапр, 568, asdfgdfgjtymQQQ 9101111';
  const namb = -123.45;
  
  console.log('тест1: в строке есть цифры')
  removeNumbersFromString(str5);
  
  console.log('тест2: в строке нет цифр')
  removeNumbersFromString(str1);
  
  console.log('тест3:  на входе число')
  removeNumbersFromString(namb);
  
  // 3. генератор [min, max] для чисел с плавающей точкой до digits знаков
  function getRandomIntPointFloat(a, b, digits = 1) {
  
    a = Math.abs(a); //  берем по модулю, для отсечения отрицательных значений
    b = Math.abs(b);
    digits = Math.abs(digits);
  
  
    let min = Math.min(a, b); //  находим мин и макс, если пользователь ввел диапозон не в том порядке
    let max = Math.max(a, b);
  
    return +(Math.random() * (max - min ) + min).toFixed(digits); // Максимум включаeтся, а минимум - нет; + - для преобразования строки в число
  
    // return +(Math.random() * (max - min +1) + min).toFixed(digits); // Максимум и минимум - включаются (+1)
  }
 
console.log('тест1: в строке есть цифры')
removeNumbersFromString(str5);

console.log('тест2: в строке нет цифр')
removeNumbersFromString(str1);

console.log('тест3:  на входе число')
removeNumbersFromString(namb);

// 3. генератор [min, max] для чисел с плавающей точкой до digits знаков
function getRandomIntPointFloat(a, b, digits = 1) {

	a = Math.abs(a); //  берем по модулю, для отсечения отрицательных значений
	b = Math.abs(b);
	digits = Math.abs(digits);


	let min = Math.min(a, b); //  находим мин и макс, если пользователь ввел диапозон не в том порядке
	let max = Math.max(a, b);

  return +(Math.random() * (max - min ) + min).toFixed(digits); // Максимум включаeтся, а минимум - нет; + - для преобразования строки в число

	// return +(Math.random() * (max - min +1) + min).toFixed(digits); // Максимум и минимум - включаются (+1)
}

//4. Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
// Попробуйте не использовать при этом функцию padStart()
function myPadStart(str, minLength, padStr) {

  if (str.length >= minLength) {
  console.log('строка без изменений!')
  return str
}

let addStr;

let addStrLength;
let addCount;
let endIndex;

console.log(`minLength = ${minLength}`);

console.log(`str.length = ${str.length}`);

addStrLength = minLength - str.length;

addCount = Math.ceil(addStrLength / padStr.length);
// надо правильно округлить до целого! 

console.log(`addStrLength = ${addStrLength}`);

console.log(`addCount = ${addCount}`);

addStr = padStr.repeat(addCount);

endIndex = addStrLength;

addStr = addStr.slice(0, endIndex);

str = addStr + str;
console.log(str);
return str;
};

// Добавочный символ использован один раз
// myPadStart('111123', 5, '0');      // '01'

// Добавочный символ использован три раза
// myPadStart('1', 4, '0');      // '0001'

// Добавочные символы обрезаны с конца
// myPadStart('q', 7, 'werty');  // 'werq'

// Добавочные символы использованы полтора раза
myPadStart('q', 4, 'we');     // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
// myPadStart('qwerty', 4, '0'); // 'qwerty'