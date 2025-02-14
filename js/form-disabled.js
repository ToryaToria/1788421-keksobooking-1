const formAdd = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const formDisabled = () => {
  formAdd.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');
};

const formActivForm = () => {
  formAdd.classList.remove('ad-form--disabled');
};

const formActivFilter = () => {
  mapFilters.classList.remove('ad-form--disabled');
};

formDisabled();

export {
  formActivFilter,
  formActivForm,
  formDisabled
};
