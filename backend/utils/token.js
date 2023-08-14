const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

const checkAuth = (token) => {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret'
    );
  } catch (err) {
    return false;
  }
};

module.exports = { checkAuth };
