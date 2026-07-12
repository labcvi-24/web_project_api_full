const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  //nombre de la tarjeta, string de 2 a 30 caracteres, campo obligatorio.
    name: {
      type: String, // establece el tipo de datos; mira opciones más abajo
      required: true, // cada instancia debe tener este campo
      minlength: 2,  // podemos especificar la longitud mínima/máxima de los campos
      maxlength: 30,
    },
    // enlace a la imagen, string, campo obligatorio. Utiliza la expresión regular del esquema user para validar los datos de entrada.
    link: {
      type: String,
      required: true,
      // validate: un validador de objetos y propiedades de mensajes
      // el validador debe ser una función que devuelva un booleano
      // el parámetro v es el dato que se tiene que validar
      validate: {
        validator: function(v) {
          return validator.isURL(v)
        },
        // mensaje que se mostrará cuando el validador devuelva false
        message: 'no es correcto',
      }
    },
    // enlace al modelo del autor de la tarjeta, tipo ObjectId, campo obligatorio.
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // 'user' es el nombre del modelo que estás asociando a éste
      required: true

    },
    // una lista de usuarios que dieron like a la publicación, un array ObjectId, un array vacío por defecto (default field)
    likes:{
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: []

    },
    // fecha de creación, tipo Date, valor por defecto Date.now
    createdAt:{
      type: Date,
      default: Date.now
    },

  });

  module.exports = mongoose.model('card', cardSchema);