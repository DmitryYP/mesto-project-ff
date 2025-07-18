// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import { createCard, handleRemoveCard, handleLikeButton } from './components/card.js';
import { openModal, closeModal, handleListener } from './components/modal.js';
import { clearValidation, enableValidation } from './scripts/validation.js';
import { getInitialCards, getProfile, editProfile, addNewCard, deleteNewCard, editAvatar, likeCardCount } from './scripts/api.js';

const cardList = document.querySelector('.places__list');
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupFullImage = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
const popupImage = popupFullImage.querySelector('.popup__image');
const popupCaptionImage = popupFullImage.querySelector('.popup__caption');
const formProfile = document.forms['edit-profile'];
const imputName = formProfile.elements.name;
imputName.setAttribute('id', 'input_name');
const formName = imputName;
const inputDescription = formProfile.elements.description;
inputDescription.setAttribute('id', 'input_description');
const formDescription = inputDescription;
const formAvatar = document.forms['avatar'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const formAddNewCard = document.forms['new-place'];
const cardImages = document.querySelectorAll('.card__image');
const submitButton = formAddNewCard.querySelector('.popup__button');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
let userId = null;

enableValidation(validationConfig);
// Попапы для форм
handleListener(popupProfile);
handleListener(popupAddNewCard);
handleListener(popupFullImage);
handleListener(popupAvatar);


function handleOpenImagePopup(src, alt) { // попап для изображения карточки
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaptionImage.textContent = alt;
  
  openModal(popupFullImage);
  }

function handleProfileFormSubmit(evt) { // Функция редактирования профиля
  evt.preventDefault();
  const formName = formProfile.elements.name;
  const formDescription = formProfile.elements.description;
  const newName = formName.value;
  const newAbout = formDescription.value;
  const submitButton = formProfile.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  editProfile(newName, newAbout)
    .then(updatedUser => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closeModal(popupProfile);  // закрываем окно после редактирования профиля
    })
    .catch((err) => {
      console.log(err);
      submitButton.textContent = 'Ошибка сохранения';
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
}

function handleAddCardSubmit(evt) { // Функция добавления карточки
  evt.preventDefault();
  const name = formAddNewCard.elements['place-name'].value;
  const link = formAddNewCard.elements.link.value;
  const submitButton = formAddNewCard.querySelector('.popup__button');
  const newCardData = { name, link };
  addNewCard(name, link)
    .then(newCardData => {
      const newCardElement = createCard(newCardData, {handleRemoveCard, handleLikeButton, handleOpenImagePopup}, userId); // Создание карточки
      cardList.prepend(newCardElement); // Добавление в начало списка
      formAddNewCard.reset(); // Сброс формы
      closeModal(popupAddNewCard);
    })
    .catch(err => {
      console.error('Ошибка при добавлении карточки:', err);
      submitButton.textContent = 'Ошибка сохранения';
    })
    .finally(() => {
    submitButton.textContent = 'Создать';
    });
}

function handleAvatarSubmit(evt) { //функция изменения аватара
  evt.preventDefault();
  const formAvatarInput = formAvatar.elements['link'];
  const avatarLink = formAvatarInput.value;
  const submitButton = formAvatar.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  editAvatar(avatarLink)
    .then(updatedUser => {
      profileAvatar.style.backgroundImage = `url(${updatedUser.avatar})`;  // По скольку базовая картинка в div'e и есть свойство backgroundImage. Обновление аватара происходит так. В противном случае обновляется только при перезагрузке страницы
      formAvatar.reset();
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
}

formProfile.addEventListener('submit', handleProfileFormSubmit);   // Изменение новых данных о пользователе

buttonOpenPopupProfile.addEventListener('click', () =>{
  openModal(popupProfile);
  formName.value = profileTitle.textContent;   // Отображения исходного имения пользователя
  formDescription.value = profileDescription.textContent;   // Отображение исходного занятия пользователя
  clearValidation(formProfile, validationConfig);
});

formAddNewCard.addEventListener('submit', handleAddCardSubmit); // Добавление новой карточки в начало списка

buttonOpenPopupAddNewCard.addEventListener('click', () =>{
  formAddNewCard.reset();   // Чистая форма при открытии попапа добавления карточки
  openModal(popupAddNewCard);
  submitButton.textContent = 'Создать';
  clearValidation(formAddNewCard, validationConfig);
});

formAvatar.addEventListener('submit', handleAvatarSubmit);  // Изменение аватара

profileAvatar.addEventListener('click', () =>{
  openModal(popupAvatar);
  clearValidation(formAvatar, validationConfig);
});

Promise.all([getInitialCards(), getProfile()])
  .then(([cards, userData]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach(newCard => {
       const card = createCard(newCard, {handleRemoveCard, handleLikeButton, handleOpenImagePopup}, userId);
       cardList.append(card);
       });
       console.log(cards)
    })
  .catch((err) => {
      console.log(err);
   });