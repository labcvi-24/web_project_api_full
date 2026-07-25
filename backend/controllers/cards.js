const Card = require('../models/card');

// GET /cards
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(err => next(err));
};

// POST /cards
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Datos inválidos';
      }
      next(err);
    });
};

// DELETE /cards/:cardId
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
  .orFail(() => {
      const error = new Error('Card no encontrada');
      error.statusCode = 404;
      throw error;
  })
  .then(card => {
    if  (card.owner.toString() !== req.user._id) {
      const err = new Error('No eres propietario de la tarjeta');
      err.statusCode = 403;
      throw err;
    }
    return card.deleteOne()
    .then(() => card)
  })
  .then((card) => {
    res.send({ message: 'Tarjeta eliminada' });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      err.statusCode = 400;
      err.message = 'ID inválido';
    }
    next(err);
  });
};

module.exports.likeCard = (req, res,next) => {
  Card.findByIdAndUpdate(
  req.params.cardId,
  {
    $addToSet: { likes: req.user._id }
  },
  { new: true }
)
    .orFail(() => {
      const error = new Error('Card no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then(card => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'ID inválido';
      }
      next(err);
  });
};


module.exports.dislikeCard =(req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id }
    },
    { new: true }
  )
    .orFail(() => {
      const error = new Error('Card no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then(card => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'ID inválido';
      }
      next(err);
  });
}
