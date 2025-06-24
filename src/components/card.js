function createCard(newCard, callbacks) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = newCard.name; // Данные карточки
  const cardImages = cardElement.querySelector('.card__image'); // Изображение
  cardImages.src = newCard.link;
  cardImages.alt = newCard.name;
  const deleteButton = cardElement.querySelector('.card__delete-button'); // Удаление карточки

  deleteButton.addEventListener('click', () => {
    callbacks.handleRemoveCard(cardElement);
  });

  const likeButton = cardElement.querySelector('.card__like-button'); // Обработчки лайка карточки
  likeButton.addEventListener('click', () => {
    callbacks.handleLikeButton(likeButton);
  });

  cardImages.addEventListener('click', () => { // Открытие попапа
    callbacks.handleOpenImagePopup(cardImages.src, cardImages.alt);
  });
  
  return cardElement;
}
export {createCard};