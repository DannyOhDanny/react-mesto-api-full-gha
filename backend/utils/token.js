const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const checkAuth = (token) => {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return false;
  }
};

module.exports = { checkAuth };
