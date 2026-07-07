// const router = require('express').Router();

const express = require('express');
const router = express.Router();
const validateUrl = require('../middleware/validateUrl');
const {celebrate, Joi} = require('celebrate');


const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/',  getCards);

router.post('/', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateUrl),
    }),
  }), createCard);

router.delete('/:cardId', celebrate({
    params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
