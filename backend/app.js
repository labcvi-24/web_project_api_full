const express = require('express');
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

const allowedCors = [
  'https://visage.strangled.net',
  'http://visage.strangled.net',
  'http://localhost:3000'
];

app.use(function(req, res, next) {
  const { origin } = req.headers; // guardar el origen de la solicitud en la variable 'origin'
  const { method } = req; // Guardar un tipo de solicitud (método HTTP) para la variable correspondiente

  // comprobar que el origen de la solicitud se mencione en la lista de los permitidos
  if (allowedCors.includes(origin)) {
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
    const requestHeaders = req.headers['access-control-request-headers'];

    res.header('Access-Control-Allow-Origin', origin);

    if (method === 'OPTIONS') {

    // permitir solicitudes de dominio cruzado de cualquier tipo (predeterminado)
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);

      return res.sendStatus(204);
    }

  }
  next();

});

//logger de solicitudes al servidor

app.use(expressWinston.logger({transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
}));

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

