const cardRouter = require('express').Router();
const { idValidation, cardValidation } = require('../middlewares/validations');
const {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  deleteLikeCard,
} = require('../constrollers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', cardValidation, postCard);
cardRouter.delete('/:id', idValidation, deleteCardById);
cardRouter.put('/:id/likes', idValidation, likeCard);
cardRouter.delete('/:id/likes', idValidation, deleteLikeCard);

module.exports = cardRouter;
