const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Обязательное поле'],
      minlength: [2, 'Минимальная длина поля - 2 символа'],
      maxlength: [30, 'Максимальная длина поля - 30 символов'],
    },
    link: {
      type: String,
      required: [true, 'Обязательное поле'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Обязательное поле'],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('card', cardSchema);
