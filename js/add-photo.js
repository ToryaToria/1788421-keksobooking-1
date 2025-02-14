import { showAlert } from './show-message.js';
import { FileTypes } from './constants.js';
const formAdd = document.querySelector('.ad-form');
const imgFieldAva = formAdd.querySelector('#avatar');
const imgElementAva = formAdd.querySelector('.ad-form-header__preview img');
const imgFieldImgs = formAdd.querySelector('#images');
const imgElementImgs = formAdd.querySelector('.ad-form__photo');

const onAvaChange = () => {
  const file = imgFieldAva.files[0];
  const fileName = file.name.toLowerCase();
  const epxFile = fileName.split('.').pop();
  const trueFileType = FileTypes.includes(epxFile);

  if (trueFileType) {
    const url = URL.createObjectURL(file);
    imgElementAva.src = url;
  } else {
    const errMess = 'Не правильный тип файла!';
    showAlert(errMess);
  }
};

const onMiniFotosChange = () => {
  const file = imgFieldImgs.files[0];
  const fileName = file.name.toLowerCase();
  const epxFile = fileName.split('.').pop();
  const trueFileType = FileTypes.includes(epxFile);

  if (trueFileType) {
    const url = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.alt = 'фоточка';
    img.src = url;
    img.width = 45;
    img.height = 45;
    img.objectFit = 'contain';

    img.classList.add = ('ad-form-header__img');
    imgElementImgs.append(img);

  } else {
    const errMess = 'Не правильный тип файла!';
    showAlert(errMess);
  }
};

const imgReset = () => {
  imgElementAva.src = 'img/muffin-grey.svg';
  imgElementImgs.innerHTML = '';
};

imgFieldAva.addEventListener('change', onAvaChange);
imgFieldImgs.addEventListener('change', onMiniFotosChange);

export {imgReset};
