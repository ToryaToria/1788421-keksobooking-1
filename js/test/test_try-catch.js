try {
  let str = '';
for (let i = 1; i <= 6 * 10 ** 6; i++) { // формируем строку более 5 мб
	str += '+';
}
localStorage.setItem('key', str); // пытаемся записать в хранилище
} catch {
  alert('1. AAAAAAAAAa!')
}



try {
	let data = JSON.parse('{1,2,3,4,5}'); // попытка распарсить некорректный JSON
  console.log(data)
} catch (error) {
	alert('2. невозможно выполнить операцию разбора JSON');
  console.log(error.name); // имя ошибки
	console.log(error.message); // текст ошибки
  console.log('невозможно выполнить операцию разбора JSON');
}

function div(a, b) {
	if (b !== 0) {
		return a / b;
	} else {
		throw new Error('На ноль делить НЕЛЬЗЯ!');
	}
}

try {
	alert( div(3, 0));
} catch (error) {
	alert('3. вы пытаетесь делить на 0, что запрещено');
}

function sqr(a) {
  if (a>=0) {
    return Math.sqrt(a)
  } else {
    		throw new Error('корень из отрицательного числа   получить НЕЛЬЗЯ!');
    	}
}

try { 
  alert(sqr(-1))

} catch (error){
     	alert('4. вы пытаетесь получить корень из отрицательного числа');
    }
