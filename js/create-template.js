// ДЗ7 "Отрисуй меня полностью" генерация объявдений по шаблону

import {
	TYPE_TRANSLATION
} from './constants.js';


const thumbnailTemplate = document.querySelector('#card').content;

const container = document.querySelector('#map-canvas');

const verificationEnoughData = (block, value) => {
	if (value) {
		return value;
	}
	block.remove();
};

const createThumbnail = (offer) => {
	//клонирую шаблон
	const thumbnail = thumbnailTemplate.cloneNode(true);

	//создаю переменные для тегов
	const avatar = thumbnail.querySelector('.popup__avatar');
	const title = thumbnail.querySelector('.popup__title');
	const adress = thumbnail.querySelector('.popup__text--address');
	const price = thumbnail.querySelector('.popup__text--price');
	const type = thumbnail.querySelector('.popup__type');
	const capacity = thumbnail.querySelector('.popup__text--capacity');
	const time = thumbnail.querySelector('.popup__text--time');
	const lis = thumbnail.querySelectorAll('.popup__feature');
	const descript = thumbnail.querySelector('.popup__description');
	const photos = thumbnail.querySelector('.popup__photos');
	const photo = thumbnail.querySelector('.popup__photo');

	// функция генерации фоточек
	function cerateImgs(arr) {
		const fragm = document.createDocumentFragment();
		for (let i = 0; i < arr.length; i++) {
			const img = photo.cloneNode(true);
			img.alt = `фоточка ${i}`;
			img.src = arr[i];
			fragm.append(img);
		}
		return fragm;
	}

	// avatar.src = offer.avatar;
	avatar.src = verificationEnoughData(avatar, offer.avatar);

	title.textContent = verificationEnoughData(title, offer.title);
	adress.textContent = `широта: ${verificationEnoughData(adress, offer.adress.lat)}, долгота: ${verificationEnoughData(adress, offer.adress.lng)}`;
	price.textContent = `${verificationEnoughData(price, offer.price)} ₽/ночь`;
	type.textContent = TYPE_TRANSLATION[verificationEnoughData(type, offer.type)];
	capacity.textContent = `${verificationEnoughData(capacity, offer.rooms)} комнаты для ${verificationEnoughData(capacity, offer.guests)} гостей`;
	time.textContent = `Заезд после ${verificationEnoughData(time, offer.checkin)}, выезд до ${verificationEnoughData(time, offer.checkout)}`;
	descript.textContent = verificationEnoughData(descript, offer.description);

	//заполнение фоточек
	//очистить всё внутри чтобы img-шаблон не попадал в разметку
	photos.innerHTML = '';
	if (verificationEnoughData(photos, offer.photos)) {
		const images = cerateImgs(offer.photos);
		photos.append(images);
	}

	// заполнение features
	lis.forEach((li) => {
		if (verificationEnoughData(li, offer.features)) {
			const isNecessary = offer.features.some(
				(userFeatuers) => li.classList.contains(('popup__feature--' + userFeatuers))
			);
			if (!isNecessary) {
				li.remove();
			}
		}
	});

	return thumbnail;
};

//генерирую DWELLING_COUNT_MAX элементов и отрисовываю их все сразу в ДОМ через фрагмент
const generateThumbnails = (offers) => {
	const fragment = document.createDocumentFragment();

	offers.forEach((offer) => {
		const thumbnail = createThumbnail(offer);
		fragment.append(thumbnail);
	});

	container.append(fragment);
};

export {
	generateThumbnails,
	createThumbnail,
};
