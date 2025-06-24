// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal, handleListener } from './components/modal.js';

const cardList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const formEditProfile = document.forms['edit-profile'];
const formName = formEditProfile.elements.name;
const formDescription = formEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewPlace = document.forms['new-place'];
const cardImages = document.querySelectorAll('.card__image');


// Попапы для форм
handleListener(popupEdit);
handleListener(popupNewCard);
handleListener(popupTypeImage);

function handleRemoveCard(cardElement) {  // Функция удаления
  cardElement.remove();
}

function handleLikeButton(likeButton) {  // Функция лайка
  likeButton.classList.toggle('card__like-button_is-active');
}

function handleOpenImagePopup(src, alt) { // попап для изображения карточки
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = alt;
  
  openModal(popupTypeImage);
  }

const callbacks = {
  handleRemoveCard,
  handleLikeButton,
  handleOpenImagePopup
};

editButton.addEventListener('click', () =>{
  openModal(popupEdit);
  formName.value = profileTitle.textContent;   // Отображения исходного имения пользователя
  formDescription.value = profileDescription.textContent;   // Отображение исходного занятия пользователя
  formEditProfile.addEventListener('submit', handleFormSubmit);   // Изменение новых данных о пользователе
});

addButton.addEventListener('click', () =>{
  openModal(popupNewCard);
  formNewPlace.addEventListener('submit', handlePlaceSubmit); // Добавление новой карточки в начало списка
});

function handleFormSubmit(evt) { // Функция редактирования профиля
  evt.preventDefault();
  const formName = formEditProfile.elements.name;
  const formDescription = formEditProfile.elements.description;
  profileTitle.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
}

function handlePlaceSubmit(evt) { // Функция добавления карточки
  evt.preventDefault();
  const name = formNewPlace.elements['place-name'].value;
  const link = formNewPlace.elements.link.value;
  const newCardData = { name, link };
  callbacks;
  const cardList = document.querySelector('.places__list'); // куда планируем добавить
  const newCardElement= createCard(newCardData, callbacks); // само добавление

  cardList.prepend(newCardElement); // Добавление карточи в начало списка

  formNewPlace.reset(); // Сброс формы
}

initialCards.forEach(item => { // Отображение карочек на экране
  const card = createCard(item, callbacks);
  cardList.append(card);
});
