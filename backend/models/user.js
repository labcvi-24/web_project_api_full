const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  // correo electronico de usuario, campo obligatorio
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),//(v) => isEmail(v),
      message: 'Formato de correo electrónico es incorrecto',
    },
  },
  // contraseña de usuario, campo obligatorio
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },

  name: {
      type: String, // establece el tipo de datos; mira opciones más abajo
      default: "Jacques Cousteau", // se usaran valores predeterminados
      minlength: 2,  // podemos especificar la longitud mínima/máxima de los campos
      maxlength: 100,
  },
    // información del usuario, string de 2 a 30 caracteres, campo obligatorio.
  about: {
      type: String,
      default: "Explorador",
      minlength: 2,  // podemos especificar la longitud mínima/máxima de los campos
      maxlength: 100,
  },
    // enlace al avatar, string, campo obligatorio.
  avatar: {
      type: String,
      default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
      // validate: un validador de objetos y propiedades de mensajes
      // el validador debe ser una función que devuelva un booleano
      // el parámetro v es el dato que se tiene que validar
      validate: {
        validator: function(v) {
          return validator.isURL(v)
        },
        // mensaje que se mostrará cuando el validador devuelva false
        message: 'Debe ser una URL válida de imagen (.jpg, .jpeg, .png o .gif)',
      }
  },

});


module.exports = mongoose.model('user', userSchema);




