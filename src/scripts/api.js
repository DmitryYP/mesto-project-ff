const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '0e37d1fc-ba09-49cc-aed6-0aac9e7bf040',
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(getResponseData);
};

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
   .then(getResponseData);
};

const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }) 
  .then(getResponseData);
}

const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }) 
  .then(getResponseData);
}

const deleteNewCard = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(getResponseData);
}

const editAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  })
  .then(getResponseData);
}

const likeCardCount = (cardID, like) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: like ? 'PUT' : 'DELETE',
    headers: config.headers,
  })
  .then(getResponseData);
}

export { getInitialCards, getProfile, editProfile, addNewCard, deleteNewCard, editAvatar, likeCardCount }