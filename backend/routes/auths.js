const authRouter = require('express').Router();
const { login, createUser, logout } = require('../constrollers/users');
const {
  signinValidation,
  signupValidation,
} = require('../middlewares/validations');

authRouter.post('/signin', signinValidation, login);
authRouter.post('/signup', signupValidation, createUser);
authRouter.post('/logout', logout);

module.exports = authRouter;
