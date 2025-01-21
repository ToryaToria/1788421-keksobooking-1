// слайдер noUiSlider для поля "Цена"
import {
  dwellingOptions
} from './valid-form.js';


const sliderPrice = document.querySelector('.ad-form__slider');
const inputPrice = document.querySelector('#price');
const inputType = document.querySelector('#type');


noUiSlider.create(sliderPrice, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',

  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderPrice.noUiSlider.on('update', () => {
  console.log('Cлайдер  подключен');
  inputPrice.value = sliderPrice.noUiSlider.get();
});


function onInputTypeChange() {

  const start = dwellingOptions[this.value];
  inputPrice.placeholder = start;

  sliderPrice.noUiSlider.updateOptions({
    start: start,
  });
}

function onInputPriceChange() {
  console.log('Hi!');
   sliderPrice.noUiSlider.set(inputPrice.value);

  console.log(inputPrice.value);
}

inputType.addEventListener('change', onInputTypeChange);

inputPrice.addEventListener('input', onInputPriceChange);
