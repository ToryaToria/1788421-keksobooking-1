// 7.11 . Отрисуй меня полностью(ч.2) активная - неактивная форма

// const mapCanvas = document.querySelector('#map-canvas'); // про карту не надо
const formAdd = document.querySelector('.ad-form');
const formFildsets = formAdd.querySelectorAll('fieldset');
const slider = formAdd.querySelector('.ad-form__slider');

const mapFilters = document.querySelector('.map__filters');
const mapfiltersSelects = mapFilters.querySelectorAll('select');
const mapfiltersFildset = mapFilters.querySelector('fieldset');

//+++++++++++++
const btnActiv = document.querySelector('#btnActiv');
const btnNotActiv = document.querySelector('#btnNotActiv');

//==========================

const formDisabled = () => {
  // КАК заблокировать слайдер?

  formAdd.classList.add('ad-form--disabled');

  // formFildsets.forEach((elem) => {
  //   elem.setAttribute("disabled", "");
  // });

  mapFilters.classList.add('ad-form--disabled');

  // mapfiltersSelects.forEach((elem) => {
  //   elem.setAttribute("disabled", "");
  // });
  // mapfiltersFildset.setAttribute("disabled", "");
  alert('форма заблокирована!');

};
//=================
const formActiv = () => {
  formAdd.classList.remove('ad-form--disabled');

  // formFildsets.forEach((elem) => {
  //   elem.removeAttribute("disabled");
  // });

  mapFilters.classList.remove('ad-form--disabled');

  // mapfiltersSelects.forEach((elem) => {
  //   elem.removeAttribute("disabled");
  // });
  // mapfiltersFildset.removeAttribute("disabled");

  alert('форма РАЗблокирована!');
}

formDisabled();


btnActiv.addEventListener('click',formActiv);
btnNotActiv.addEventListener('click',formDisabled);

export{
  formDisabled,
  formActiv
};