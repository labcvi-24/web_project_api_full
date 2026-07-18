const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const SECRET_KEY =
  NODE_ENV === 'production'
    ? JWT_SECRET
    : 'super-strong-secret';

// donde se crea el token
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  // busca en la base de datos el usuario con el correo proporcionado
  User.findOne({ email }).select('+password')
    .then((foundUser) => {
      // el hash de la contraseña estará ahí, en el objeto user
      if (!foundUser) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      // comparando la contraseña enviada y el hash de la base de datos
      return bcrypt.compare(password, foundUser.password)
        .then((matched) => {
          if (!matched) {
             // si los hashes no coinciden, se rechaza el promise
            return Promise.reject(new Error('Incorrect password or email'));
          }
          return foundUser;
        });
    })
    // foundUser es una variable local del .then()
    .then((foundUser) => {
      // autenticación exitosa
      res.send({ token: jwt.sign(
        { _id: foundUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        {expiresIn: '7d'})});

    })
    .catch((e) => {
      const err = new Error('Se requiere autorización');
      err.statusCode = 401;

      next(err);
    })
};


//se recibe peticion GET /users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(err => next(err));
};

// GET /users/:userId
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params; //Obtiene el userId de la URL.

  User.findById(userId)
    .orFail(() => {
    const error = new Error("No se ha encontrado ningun usuario con ese id");
    error.statusCode = 404;
    throw error;
    })
    .then((foundUser) => {
      res.send(foundUser);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'ID inválido';
      }
      next(err);
    })

};


module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((foundUser) => {
      res.send(foundUser);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'ID inválido';
      }
      next(err);
    })
};

// POST /users

// En el controlador createUser , el correo electrónico y el hash de la contraseña
// se escriben en la base de datos.
module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar} = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar
    }))
    .then((foundUser) => {
      res.send(foundUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Datos inválidos';
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true } //devuelve el documento después de la actualización, también valida los datos cuando actualizo"".
  )
    .orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then(foundUser => res.send(foundUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Datos inválidos';
      }
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'ID inválido';
      }
      next(err)
    })
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then(foundUser => res.send(foundUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Datos inválidos';
      }
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'ID inválido';
      }
      next(err);
  });
}



