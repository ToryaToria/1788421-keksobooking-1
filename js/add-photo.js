import { showAlert } from './show-message.js';
import { FileTypes } from './constants.js';
const formAdd = document.querySelector('.ad-form');
const imgFieldAvatar = formAdd.querySelector('#avatar');
const imgElementAvatar = formAdd.querySelector('.ad-form-header__preview img');
const imgFieldImgs = formAdd.querySelector('#images');
const imgElementImgs = formAdd.querySelector('.ad-form__photo');

const onAvaChange = () => {
  const file = imgFieldAvatar.files[0];
  const fileName = file.name.toLowerCase();
  const epxFile = fileName.split('.').pop();
  const trueFileType = FileTypes.includes(epxFile);

  if (trueFileType) {
    const url = URL.createObjectURL(file);
    imgElementAvatar.src = url;
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
  imgElementAvatar.src = 'img/muffin-grey.svg';
  imgElementImgs.innerHTML = '';
};

imgFieldAvatar.addEventListener('change', onAvaChange);
imgFieldImgs.addEventListener('change', onMiniFotosChange);

export {imgReset};
