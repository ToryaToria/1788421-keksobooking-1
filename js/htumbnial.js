// ДЗ7 "Отрисуй меня полностью" генерация объявдений по шаблону

import {
	TYPE_TRANSLATION
} from './data.js'


const OBJ = [
	{
		adress: {
			lat: 35.66185, lng: 139.77543
		},
		avatar: "photos/user03.png",
		// avatar: "",

		checkin: "13.00",
		checkout: "12.00",
		// description: "Величественный и изысканный дворец",
		// features: [
		// 	"parking",
		// 	"elevator"
		// ],
		guests: 4,
		photos: [
			"https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg",
			"https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg",
			"https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg"
		],
		price: 45512,
		rooms: 7,
		// title: "Оазис в центре города",
		type: "hotel"
	},

];

// получаю контент шаблона
const thumbnailTemplate = document.querySelector('#card').content;

// //создаю переменные для тегов
// const avatar = thumbnailTemplate.querySelector('.popup__avatar');
// const title = thumbnailTemplate.querySelector('.popup__title');
// const adress = thumbnailTemplate.querySelector('.popup__text--address');
// const price = thumbnailTemplate.querySelector('.popup__text--price');
// const type = thumbnailTemplate.querySelector('.popup__type');
// const capacity = thumbnailTemplate.querySelector('.popup__text--capacity');
// const time = thumbnailTemplate.querySelector('.popup__text--time');
// const lis = thumbnailTemplate.querySelectorAll('.popup__feature');
// const descript = thumbnailTemplate.querySelector('.popup__description');
// const photos = thumbnailTemplate.querySelector('.popup__photos');
// const photo = thumbnailTemplate.querySelector('.popup__photo');


// куда вставить все готовые объявления
const container = document.querySelector('#map-canvas');

// функция генгерации  и заполнения элемента из шаблона
// {деструктуризация - вместо picture}
// const createThumbnail = ({ url, description, comments, likes }) 

//функция проверки когда данных для заполнения не хватает.
const verificationEnoughData = (block, value) => {
	if (value) {
		return value;
	}
	block.remove();
}

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
			img.alt = `фоточка ${i}`
			img.src = arr[i];
			fragm.append(img);
			// console.log(arr[i]);
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
	photos.innerHTML = ''; 	//очистить всё внутри чтобы img-шаблон не попадал в разметку
	if (verificationEnoughData(photos, offer.photos)) {
		const images = cerateImgs(offer.photos);
		photos.append(images);
	}

	// заполнение features 
	lis.forEach((li) => {
		if (verificationEnoughData(li, offer.features)) {
		const isNecessary = offer.features.some(
			(userFeatuers) => li.classList.contains(('popup__feature--' + userFeatuers))
		)
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

// generateThumbnails(OBJ);
export {
	generateThumbnails,
	createThumbnail,
	OBJ
};
