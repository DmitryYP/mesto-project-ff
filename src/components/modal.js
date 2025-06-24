const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened'); // находим открытый попап
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened')  // добавляем класс открытия попапа
  document.addEventListener('keydown', handleEscKeyUp)  // добавляем слушатель на кнопку Escape
};

export const closeModal= (modal) => {
  modal.classList.remove('popup_is-opened') // удалить класс открытия попапа
  document.removeEventListener('keydown', handleEscKeyUp)  // удалить слушатель на кнопку Escape
};

export const handleListener = (popupElement) => {
  popupElement.classList.add('popup_is-animated');
  const closeButton = popupElement.querySelectorAll('.popup__close') // ищем кнопку крестик в попапе
  closeButton.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
    });
  });  

  popupElement.addEventListener('mousedown', (event) => {
    if(event.target.classList.contains('popup')) {
      closeModal(popupElement); // если event.target содержит класс "popup", то закрываем
    }
  });
}