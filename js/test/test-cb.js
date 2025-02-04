// function square(num) {
// 	return num * num;
// }

// function each(arr, callback) {
// 	let result = [];

// 	for (let elem of arr) {
// 		result.push( callback(elem) ); // вызываем функцию-коллбэк
// 	}

// 	return result;
// }

// let result = each([1, 2, 3, 4, 5], square);
// console.log(result);

// function test() {
// 	let num1 = 1;
// 	let num2 = 2;

// 	return function() {
// 		return num1 + num2;
// 	}
// }

// console.log(test()());

// function test() {
// 	let num1 = 1;
// 	let num2 = 2;

// 	return function() {
// 		return num1 + num2;
// 	}
// }

// let func = test();
// console.log(func);

// function test() {
// 	let num = 1;

// 	return function() {
// 		return num;
// 	}
// }

// let num = 2;
// let func = test();
// console.log(func());

// function func() {
// 	let num = 0;

// 	return function() {
// 		console.log(num);
// 		num++;
// 	};
// }

// func()();
// func()();
// func()();


// let counter = 0;

// function test() {
// 	return function() {
// 		console.log(counter);
// 		counter++;
// 	};
// }

// let func = test;

// let func1 = func();
// let func2 = func();
// func1();
// func2();
// func1();
// func2();



// function test() {
// 	let counter = 0;

// 	return function() {
// 		return function() {
// 			console.log(counter);
// 			counter++;
// 		};
// 	};
// }

// let func = test()();

// let func1 = func;
// let func2 = func;
// func1();
// func2();
// func1();
// func2();


// function test() {
// 	let counter = 0;

// 	return function() {
// 		return function() {
// 			console.log(counter);
// 			counter++;
// 		};
// 	};
// }

// let func = test();

// let func1 = func();
// let func2 = func();
// func1();
// func1();
// func2();
// func2();

function make(callback) {
	setTimeout(function () {
		console.log('1');
		callback();
	}, 3000);
}

make(function () {
	console.log('2');
	console.log('3');
});