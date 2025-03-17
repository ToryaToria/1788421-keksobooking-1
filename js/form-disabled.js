const formAdd = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const fieldsets = formAdd.querySelectorAll('fieldset');
const selects = mapFilters.querySelectorAll('select');

const formDisabled = () => {
  formAdd.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');
  fieldsets.forEach((elem) => {
    elem.disabled = true;
  });

  selects.forEach((elem) => {
    elem.disabled = true;
  });
};

const activeForm = () => {
  formAdd.classList.remove('ad-form--disabled');
  fieldsets.forEach((elem) => {
    elem.disabled = false;
  });
};

const activeFilter = () => {
  mapFilters.classList.remove('ad-form--disabled');
  selects.forEach((elem) => {
    elem.disabled = false;
  });
};

export {
  formDisabled,
  activeForm,
  activeFilter
};
