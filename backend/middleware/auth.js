const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
// Este middleware hará lo contrario del login.
// En lugar de crear el token, lo verificará.


module.exports = (req, res, next) => {
  const { authorization } = req.headers; //Leer el token de los encabezados (headers) de la solicitud.
  if (!authorization || !authorization.startsWith('Bearer ')) { // dectecta que no hay token o que el formato es incorrecto.
    const err = new Error('Se requiere autorización');
    err.statusCode = 401;

    return next(err);
  }
const token = authorization.split('Bearer ')[1];
let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret'
    );
  } catch (e) {
  const err = new Error('Se requiere autorización');
  err.statusCode = 401;

  return next(err); // // detiene el flujo y envía el error

  }
  req.user = payload; // asigna el payload al objeto de solicitud  // solo se ejecuta si el token fue válido

  next();//pasa al siguiente middleware o ruta

};
