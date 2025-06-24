// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, handleRemoveCard, handleLikeButton } from './components/card.js';
import { openModal, closeModal, handleListener } from './components/modal.js';

const cardList = document.querySelector('.places__list');
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupFullImage = document.querySelector('.popup_type_image');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
const popupImage = popupFullImage.querySelector('.popup__image');
const popupCaptionImage = popupFullImage.querySelector('.popup__caption');
const formProfile = document.forms['edit-profile'];
const imputName = formProfile.elements.name;
imputName.setAttribute('id', 'inputNameFormProfile');
const formName = imputName;
const inputDescription = formProfile.elements.description;
inputDescription.setAttribute('id', 'inputDescriptionFormProfile');
const formDescription = inputDescription;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formAddNewCard = document.forms['new-place'];
const cardImages = document.querySelectorAll('.card__image');


// Попапы для форм
handleListener(popupProfile);
handleListener(popupAddNewCard);
handleListener(popupFullImage);

function handleOpenImagePopup(src, alt) { // попап для изображения карточки
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaptionImage.textContent = alt;
  
  openModal(popupFullImage);
  }

const callbacks = {
  handleRemoveCard,
  handleLikeButton,
  handleOpenImagePopup
};

function handleProfileFormSubmit(evt) { // Функция редактирования профиля
  evt.preventDefault();
  const formName = formProfile.elements.name;
  const formDescription = formProfile.elements.description;
  profileTitle.textContent = formName.value;
  profileDescription.textContent = formDescription.value;

  closeModal(popupProfile); // закрываем окно после редактирования профиля
}

function handleAddCardSubmit(evt) { // Функция добавления карточки
  evt.preventDefault();
  const name = formAddNewCard.elements['place-name'].value;
  const link = formAddNewCard.elements.link.value;
  const newCardData = { name, link };
  callbacks;
  const newCardElement= createCard(newCardData, callbacks); // само добавление

  cardList.prepend(newCardElement); // Добавление карточи в начало списка

  formAddNewCard.reset(); // Сброс формы

  closeModal(popupAddNewCard);  // закрываем окно после добавления карточки
}

formProfile.addEventListener('submit', handleProfileFormSubmit);   // Изменение новых данных о пользователе

buttonOpenPopupProfile.addEventListener('click', () =>{
  openModal(popupProfile);
  formName.value = profileTitle.textContent;   // Отображения исходного имения пользователя
  formDescription.value = profileDescription.textContent;   // Отображение исходного занятия пользователя
});

formAddNewCard.addEventListener('submit', handleAddCardSubmit); // Добавление новой карточки в начало списка

buttonOpenPopupAddNewCard.addEventListener('click', () =>{
  openModal(popupAddNewCard);
});


initialCards.forEach(item => { // Отображение карочек на экране
  const card = createCard(item, callbacks);
  cardList.append(card);
});
