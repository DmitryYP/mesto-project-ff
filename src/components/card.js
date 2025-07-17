import { likeCardCount, deleteNewCard } from '../scripts/api';
const likeModifier = "card__like-button_is-active"; 

const cardTemplate = document.querySelector('#card-template').content;
function createCard(newCard, {handleRemoveCard, handleLikeButton, handleOpenImagePopup}, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = newCard.name; // Данные карточки
  const cardImages = cardElement.querySelector('.card__image'); // Изображение
  cardImages.src = newCard.link;
  cardImages.alt = newCard.name;
  const deleteButton = cardElement.querySelector('.card__delete-button'); // Кнопка удаления карточки
  const likesCount = cardElement.querySelector('.card__like-count'); // Счётчик лайков(!)
  const likeButton = cardElement.querySelector('.card__like-button');

  const isLiked = newCard.likes.some((like) => like._id === userId);
  if (isLiked) likeButton.classList.add(likeModifier);
  likesCount.textContent = newCard.likes.length;

  if (newCard.owner._id === userId && handleRemoveCard) {
    deleteButton.addEventListener('click', () => {
      handleRemoveCard(newCard._id, cardElement);
  });
  } else {
    deleteButton.remove();
  }

 if (handleLikeButton) {
  likeButton.addEventListener('click', () => {  // Слушатель на кнопку лайка
    handleLikeButton(newCard, likeButton, likesCount);
  });
}

  if (handleOpenImagePopup) {
    cardImages.addEventListener('click', () => 
    handleOpenImagePopup(cardImages.src, cardImages.alt)
    );
  }
  
  return cardElement;
}

function handleRemoveCard(newCardId, cardElement) {
  deleteNewCard(newCardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}


function handleLikeButton(newCard, likeButton, likesCount) {
  const cardId = newCard._id; // Идентификатор карточки!!
  const isLiked = likeButton.classList.contains(likeModifier); // Текущий статус лайка

  likeCardCount(cardId, !isLiked)
    .then((cardData) => {
      likeButton.classList.toggle(likeModifier); // Обновляем КЛАСС лайка
      likesCount.textContent = cardData.likes.length; // // Обновляем СЧЁТЧИК лайков
    })
    .catch((err) => {
      console.log(err);
    });
}

export {createCard, handleRemoveCard, handleLikeButton};