const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, 'Обязательное поле'],
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      // required: [true, 'Обязательное поле'],
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      // required: [true, 'Обязательное поле'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: [true, 'Обязательное поле'],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный Email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Обязательное поле'],
      minlength: 8,
      select: false,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);
