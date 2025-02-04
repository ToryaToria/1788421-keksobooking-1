import {
	TYPE_TRANSLATION
} from './constants.js';

const template = document.querySelector('#card').content;

// const container = document.querySelector('#map-canvas');

const verificationEnoughData = (block, value) => {
	if (value) {
		return value;
	}
	block.remove();
};

const createTemplate = (templateArray) => {
	//клонирую шаблон
	const templateNode = template.cloneNode(true);

	//создаю переменные для тегов
	const avatar = templateNode.querySelector('.popup__avatar');
	const title = templateNode.querySelector('.popup__title');
	const location = templateNode.querySelector('.popup__text--address');
	const price = templateNode.querySelector('.popup__text--price');
	const type = templateNode.querySelector('.popup__type');
	const capacity = templateNode.querySelector('.popup__text--capacity');
	const time = templateNode.querySelector('.popup__text--time');
	const lis = templateNode.querySelectorAll('.popup__feature');
	const descript = templateNode.querySelector('.popup__description');
	const photos = templateNode.querySelector('.popup__photos');
	const photo = templateNode.querySelector('.popup__photo');

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

	console.log(templateArray.author.avatar);

	// author.src = templateArray.author.avatar;
	avatar.src = verificationEnoughData(avatar, templateArray.author.avatar);

	title.textContent = verificationEnoughData(title, templateArray.offer.title);

	// location.textContent = `широта: ${verificationEnoughData(location, offer.location.lat)}, долгота: ${verificationEnoughData(location, templateArray.location.lng)}`;

	location.textContent =  verificationEnoughData(location, templateArray.offer.address);
	
	price.textContent = `${verificationEnoughData(price, templateArray.offer.price)} ₽/ночь`;

	type.textContent = TYPE_TRANSLATION[verificationEnoughData(type, templateArray.offer.type)];

	capacity.textContent = `${verificationEnoughData(capacity, templateArray.rooms)} комнаты для ${verificationEnoughData(capacity, templateArray.guests)} гостей`;

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
	lis.forEach((li) => {
		if (verificationEnoughData(li, templateArray.offer.features)) {
			const isNecessary = templateArray.offer.features.some(
				(userFeatuers) => li.classList.contains(('popup__feature--' + userFeatuers))
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
