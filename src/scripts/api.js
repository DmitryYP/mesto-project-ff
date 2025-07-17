const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '0e37d1fc-ba09-49cc-aed6-0aac9e7bf040',
    'Content-Type': 'application/json'
  }
}   // УБРАТЬ КАТЧИ

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);       // если ошибка, отклоняем промис
    })
};

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
   .then(res => {
     if (res.ok) {
       return res.json();
     }

     return Promise.reject(`Ошибка: ${res.status}`);
   })
};

const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }) 
  .then(res => {
     if (res.ok) {
       return res.json();
     }

     return Promise.reject(`Ошибка: ${res.status}`);
   })
}

const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }) 
  .then(res => {
     if (res.ok) {
       return res.json();
     }

     return Promise.reject(`Ошибка: ${res.status}`);
   })
}

const deleteNewCard = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
     if (res.ok) {
       return res.json();
     }

     return Promise.reject(`Ошибка: ${res.status}`);
   })
}

const editAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  })
  .then(res => {
     if (res.ok) {
       return res.json();
     }

     return Promise.reject(`Ошибка: ${res.status}`);
   })
}

const likeCardCount = (cardID, like) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: like ? 'PUT' : 'DELETE',
    headers: config.headers,
  })
  .then(res => {
     if (res.ok) {
       return res.json();
     }

     return Promise.reject(`Ошибка: ${res.status}`);
   })
}

export { getInitialCards, getProfile, editProfile, addNewCard, deleteNewCard, editAvatar, likeCardCount }