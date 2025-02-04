// слайдер noUiSlider для поля "Цена"
import {
  DwellingOptions
} from './constants.js';


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
  inputPrice.value = sliderPrice.noUiSlider.get();
});

function onInputTypeChange() {

  const start = DwellingOptions[this.value];
  inputPrice.placeholder = start;

  sliderPrice.noUiSlider.updateOptions({
    start: start,
  });
}

function onInputPriceChange() {
   sliderPrice.noUiSlider.set(inputPrice.value);
  console.log(inputPrice.value);
}

inputType.addEventListener('change', onInputTypeChange);

inputPrice.addEventListener('input', onInputPriceChange);
