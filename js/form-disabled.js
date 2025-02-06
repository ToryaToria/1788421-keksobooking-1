// 7.11 . Отрисуй меня полностью(ч.2) активная - неактивная форма

const formAdd = document.querySelector('.ad-form');

const mapFilters = document.querySelector('.map__filters');

const formDisabled = () => {

  formAdd.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');

  console.log('формЫ заблокированЫ!');
};

const formActivForm = () => {
  formAdd.classList.remove('ad-form--disabled');

  console.log('форма ad-form РАЗблокирована!');
};

const formActivFilter = () => {
  mapFilters.classList.remove('ad-form--disabled');

  console.log('форма с фильтрами РАЗблокирована!');
};
formDisabled(); // здесь или в MAIN?

export {
  formActivFilter,
  formActivForm
};
