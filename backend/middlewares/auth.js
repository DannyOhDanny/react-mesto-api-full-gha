const { Unauthorized } = require('../utils/errors');
const { checkAuth } = require('../utils/token');

const auth = (req, res, next) => {
  // console.log(req.cookies);
  if (!req.cookies) {
    throw new Unauthorized('Доступ отклонен');
  }
  const token = req.cookies.jwt;
  // console.log(`Токен ${token}`);
  if (!token) {
    throw new Unauthorized('Токен отсутствует');
  }
  const payload = checkAuth(token);
  // console.log(payload);

  if (!payload) {
    throw new Unauthorized('Вы не авторизированы');
  }
  req.user = { payload };
  // console.log(req.user);
  next();
};

module.exports = {
  auth,
};
