class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ответа сервера! Код ошибки:${res.status} - ${res.statusText}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(res => this._handleServerResponse(res));
  }

  getCardsFromServer() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(res => this._handleServerResponse(res));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  setNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  deleteUserCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  putUserLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  deleteUserLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }
}

const api = new Api({
  url: 'https://api.dmatveeva.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
