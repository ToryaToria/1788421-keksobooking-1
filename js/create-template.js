import {
  TYPE_TRANSLATION
} from './constants.js';

import {
  verificationEnoughData
} from './util.js';

const template = document.querySelector('#card').content;

const addGuests = (elem) => {
  if (elem === 0) {
    return 'не для гостей';
  } else if (elem === 1) {
    return `для ${elem} гостя`;
  }
  return `для ${elem} гостей`;
};

const addRooms = (elem) => {
  if (elem === 100) {
    return `${elem} комнат`;
  } else if (elem === 1) {
    return `${elem} комната`;
  }
  return `${elem} комнаты`;
};

const createTemplate = (templateArray) => {
  const templateNode = template.cloneNode(true);

  const avatar = templateNode.querySelector('.popup__avatar');
  const title = templateNode.querySelector('.popup__title');
  const location = templateNode.querySelector('.popup__text--address');
  const price = templateNode.querySelector('.popup__text--price');
  const type = templateNode.querySelector('.popup__type');
  const capacity = templateNode.querySelector('.popup__text--capacity');
  const time = templateNode.querySelector('.popup__text--time');
  const features = templateNode.querySelectorAll('.popup__feature');
  const descript = templateNode.querySelector('.popup__description');
  const photos = templateNode.querySelector('.popup__photos');
  const photo = templateNode.querySelector('.popup__photo');

  // функция генерации фоточек
  const cerateImgs = (arr) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      const img = photo.cloneNode(true);
      img.alt = `фоточка ${i}`;
      img.src = arr[i];
      fragment.append(img);
    }
    return fragment;
  };

  avatar.src = verificationEnoughData(avatar, templateArray.author.avatar);

  title.textContent = verificationEnoughData(title, templateArray.offer.title);

  location.textContent = verificationEnoughData(location, templateArray.offer.address);

  price.textContent = `${verificationEnoughData(price, templateArray.offer.price)} ₽/ночь`;

  type.textContent = TYPE_TRANSLATION[verificationEnoughData(type, templateArray.offer.type)];
  // capacity.textContent = `${verificationEnoughData(capacity, templateArray.offer.rooms)} комнаты для ${verificationEnoughData(capacity, templateArray.offer.guests)} гостей`;

  capacity.textContent = `${addRooms(verificationEnoughData(capacity, templateArray.offer.rooms))} ${addGuests(verificationEnoughData(capacity, templateArray.offer.guests))}`;

  time.textContent = `Заезд после ${verificationEnoughData(time, templateArray.offer.checkin)}, выезд до ${verificationEnoughData(time, templateArray.offer.checkout)}`;

  descript.textContent = verificationEnoughData(descript, templateArray.offer.description);

  //заполнение фоточек
  //очистить всё внутри чтобы img-шаблон не попадал в разметку
  photos.innerHTML = '';
  if (verificationEnoughData(photos, templateArray.offer.photos)) {
    const images = cerateImgs(templateArray.offer.photos);
    photos.append(images);
  }

  // заполнение features
  features.forEach((li) => {
    if (verificationEnoughData(li, templateArray.offer.features)) {
      const isNecessary = templateArray.offer.features.some(
        (userFeatuers) => li.classList.contains((`popup__feature--${userFeatuers}`))
      );
      if (!isNecessary) {
        li.remove();
      }
    }
  });
  return templateNode;
};

export {
  createTemplate,
};
