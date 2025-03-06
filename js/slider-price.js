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
  // start: DwellingOptions.flat,
  start: 1000,
  step: 1,
  connect: 'lower',

  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value)
  },
});

sliderPrice.noUiSlider.on('update', () => {
  if (!flagSliderMax) {
    inputPrice.value = sliderPrice.noUiSlider.get();
  }
});

const onInputTypeChange = (evt) => {
  const start = DwellingOptions[evt.target.value];
  inputPrice.placeholder = start;
};

const onInputPriceChange = () => {
  const value = inputPrice.value;
  if (!value.length) {
    inputPrice.value = SLIDER_MIN;
  }
  flagSliderMax = Number(value) > SLIDER_MAX;
  sliderPrice.noUiSlider.set(inputPrice.value);
};

inputType.addEventListener('change', onInputTypeChange);
inputPrice.addEventListener('input', onInputPriceChange);
