// слайдер noUiSlider для поля "Цена"
import {
  DwellingOptions,
  SLIDER_MAX,
  SLIDER_MIN
} from './constants.js';

const sliderPrice = document.querySelector('.ad-form__slider');
const inputPrice = document.querySelector('#price');
const inputType = document.querySelector('#type');

let flagSliderMax = false;

noUiSlider.create(sliderPrice, {
  range: {
    min: SLIDER_MIN,
    max: SLIDER_MAX,
  },
  start: DwellingOptions.flat,
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
  if (!flagSliderMax) {
    inputPrice.value = sliderPrice.noUiSlider.get();
  }
});

function onInputTypeChange() {

  const start = DwellingOptions[this.value];
  inputPrice.placeholder = start;

  sliderPrice.noUiSlider.updateOptions({
    start: start,
  });
}

function onInputPriceChange() {
  const value = inputPrice.value;
  if (!value.length) {
    inputPrice.value = SLIDER_MIN;
  }
  flagSliderMax = Number(value) > SLIDER_MAX;
  sliderPrice.noUiSlider.set(inputPrice.value);
}

inputType.addEventListener('change', onInputTypeChange);
inputPrice.addEventListener('input', onInputPriceChange);
