export const BASE_URL = 'http://localhost:4000';
//export const BASE_URL = 'https://dmatveeva.students.nomoreparties.co';
// function handleServerResponse(res) {
//   res.ok
//     ? res.json()
//     : Promise.reject(`Ошибка ответа сервера! Код ошибки:${res.status} - ${res.statusText}`);
// }

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res =>
    res.ok
      ? res.json()
      : Promise.reject(
          `Ошибка ответа сервера при регистрации! Код ошибки:${res.status} - ${res.statusText}`
        )
  );
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res =>
    res.ok
      ? res.json()
      : Promise.reject(
          `Ошибка ответа сервера при логине! Код ошибки:${res.status} - ${res.statusText}`
        )
  );
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res =>
    res.ok ? res.json() : Promise.reject(`Ошибка токена ${res.status} - ${res.statusText}`)
  );
};

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  }).then(res =>
    res.ok ? res.json() : Promise.reject(`Ошибка удаления токена ${res.status} - ${res.statusText}`)
  );
};
