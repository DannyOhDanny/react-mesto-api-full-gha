require('dotenv').config();
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const cookies = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const authRouter = require('./routes/auths');
const { auth } = require('./middlewares/auth');
const { handleErrors, error404 } = require('./utils/handleErrors');

const { PORT, DB_URL } = process.env; // подключает глобальные переменные
// console.log(require('crypto').randomBytes(32).toString('hex'));

const app = express();

app.use(cookies()); // осуществляет работу с куками в коде сервера
app.use(helmet()); // защищает приложение от веб-уязвимостей через настройку заголовков
app.use(express.json()); // подключаем парсер .json
app.use(requestLogger); // подключаем логгер запросов
app.use(
  cors({
    origin: [
      'https://localhost:3000',
      'http://localhost:3000',
      'http://dmatveeva.students.nomoreparties.co',
      'https://dmatveeva.students.nomoreparties.co',
      'http://api.dmatveeva.nomoreparties.co',
      'https://api.dmatveeva.nomoreparties.co',
    ],
    credentials: true,
    maxAge: 30,
  })
); // разрешает кросс-доменные запросы

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); // Краш-тест сервера

app.use('/', authRouter);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('/*', error404);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // стандартные ошибки
app.use(handleErrors); // кастомные ошибки

mongoose.connect(DB_URL); // подключаем БД MongoDB

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
}); // Слушаем порт
