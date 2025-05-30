// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function createCard(newCard, deleteCard){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__title').textContent = newCard.name;
  cardElement.querySelector('.card__image').src = newCard.link;
  cardElement.querySelector('.card__image').alt = newCard.name;
  cardDelete.addEventListener('click', () => {
    deleteCard(cardElement);
  });
  return cardElement;
}

 initialCards.forEach(item => {
  const card = createCard(item, deleteCard);
  cardList.append(card);
});


function deleteCard(cardElement) {
  cardElement.remove();
}