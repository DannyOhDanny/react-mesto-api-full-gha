const userRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUser,
} = require('../constrollers/users');
const {
  updateUserValidation,
  updateAvatarValidation,
  idValidation,
} = require('../middlewares/validations');

userRouter.get('/', getUsers);
userRouter.get('/me', getUser);
userRouter.get('/:id', idValidation, getUserById);
userRouter.patch('/me', updateUserValidation, updateUser);
userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = userRouter;
