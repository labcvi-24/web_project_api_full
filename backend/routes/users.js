const express = require('express');
const router = express.Router();
const validateUrl = require('../middleware/validateUrl');
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);


// ruta fija
router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
    params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(100),
      about: Joi.string().required().min(2).max(100),
    }),
  }),updateProfile);

router. patch('/me/avatar', celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateUrl),
    }),
  }),updateAvatar);

module.exports = router;
