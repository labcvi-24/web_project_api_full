const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const validateUrl = require('./middleware/validateUrl');

const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');

const expressWinston = require("express-winston");
const winston = require("winston");

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

const PORT = 3000;


mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());



// creacion u habilitacion de CORS

app.use(cors());
app.options('*', cors()); //habilitar las solicitudes de todas las rutas

//logger de solicitudes al servidor

app.use(expressWinston.logger({transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
}));

//en caso de que el servidor se caiga
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

// rutas publicas- sin proteccion
// ruta para el inicio de sesión y el registro
app.post('/signin', login);  // inicio de sesion
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(100),
    about: Joi.string().min(2).max(100),
    avatar: Joi.string().custom(validateUrl),
  }),
}), createUser); //registro

//// Middleware de autenticación
app.use(auth);

// aqui conecto las rutas modulares- rutas protegidas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('/', (req, res) =>{
  res.status(404).json({
    message: "Requested resource not found"
  });
});

//middleware de celebrate
app.use(errors());


//logger de errores
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
}));

// middleware de errores

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error has ocurred on the server'
        : message
    });

});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

