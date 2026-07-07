const validator = require('validator');
const { Joi } = require('celebrate');

//funcion de validacion de solicitudes
validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error('string.uri');
};

module.exports = validateUrl;