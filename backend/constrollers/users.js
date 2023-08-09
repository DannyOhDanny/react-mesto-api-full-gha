const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require('../models/user');

const {
  Unauthorized,
  GeneralError,
  NotFound,
  BadRequest,
} = require('../utils/errors');

const { NODE_ENV, SECRET_KEY } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      throw new NotFound('Cписок пользователей пуст');
    } else {
      res.status(200).send({ users });
    }
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequest('Введите правильный ID пользователя');
    }
    const user = await User.findById(req.params.id);
    if (user === null) {
      throw new NotFound('Пользователь с таким ID не найден');
    } else {
      res.status(200).send({ user });
    }
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { name, about, email, password, avatar } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      email,
      password: hashPassword,
      avatar,
    });
    res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, about } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.payload._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.payload._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!req.body) {
      throw new GeneralError('На сервере произошла ошибка');
    }

    if (!email || !password) {
      throw new BadRequest('Не указан логин или пароль');
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || user === null) {
      throw new Unauthorized('Такого пользователя не существует');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Unauthorized('Неверный логин или пароль');
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret',
      {
        expiresIn: '7d',
      }
    );
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });

    res.status(200).send({
      _id: user._id,
      message: 'Вы успешно авторизированы',
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.payload._id);

    if (user === null) {
      throw new NotFound('Cписок пользователей пуст');
    }
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};
// Удаление куки с jwt-токеном
const logout = async (req, res) => {
  if (res.cookie) {
    await res.clearCookie('jwt');
    res.status(200).send({ message: 'Вы вышли из своего аккаунта' });
  }
  if (!res.cookie) {
    throw new BadRequest('Неверные данные авторизации');
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getUser,
  logout,
};
