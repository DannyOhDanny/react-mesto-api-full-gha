const validator = require('validator');
const Card = require('../models/card');
const { BadRequest, NotFound, Forbidden } = require('../utils/errors');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    if (cards.length === 0) {
      throw new NotFound('Cписок карточек пуст');
    } else {
      res.status(200).send({ cards });
    }
  } catch (err) {
    next(err);
  }
};

const postCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user.payload._id });

    res.status(200).send({ card });
  } catch (err) {
    next(err);
  }
};

const deleteCardById = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequest('Формат ID неверный');
    }
    const card = await Card.findByIdAndRemove(req.params.id);

    if (card == null || !card) {
      throw new NotFound('Карточка с таким ID не найдена');
    }
    if (!card.owner.equals(req.user.payload._id)) {
      throw new Forbidden('Удаление чужих карточек - запрещено.');
    }
    res.status(200).send({ message: 'Карточка удалена' });
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequest('Формат ID неверный');
    }
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user.payload._id } }, // добавить _id из user.payload в массив
      { new: true }
    );
    if (card === null) {
      throw new NotFound('Карточка не найдена');
    } else {
      res.status(201).send({ card, message: 'Лайк установелен' });
    }
  } catch (err) {
    next(err);
  }
};

const deleteLikeCard = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequest('Формат ID неверный');
    }

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user.payload._id } }, // удалить _id из user.payload из массива
      { new: true }
    );
    if (card === null) {
      throw new NotFound('Карточка не найдена');
    }

    res.status(200).send({ card, message: 'Лайк удален' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  deleteLikeCard,
};
