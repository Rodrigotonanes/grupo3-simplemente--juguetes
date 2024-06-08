const { check } = require("express-validator");
const path = require("path");

const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;

const fieldName = check("name")
  .notEmpty()
  .withMessage('El nombre es requerido <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  .isAlphanumeric("es-ES", { ignore: " .," })
  .withMessage("El nombre debe ser alfanumérico <i class='fa-solid fa-triangle-exclamation'></i>")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("El nombre debe tener un minimo de 5 caracteres <i class='fa-solid fa-triangle-exclamation'></i>");
 
const fieldPrice = check('price')
  .notEmpty()
  .withMessage('El precio es requerido <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  .isNumeric()
  .withMessage('El precio debe ser un numero <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  .custom((value, { req }) => {
    const valor = req.body?.price
    if (valor == '') {
      return true
    } else {
      if (valor < 0) {
        throw new Error('El precio debe ser positivo <i class="fa-solid fa-triangle-exclamation"></i>')
      }
    }
    return true
  })
  .bail()
  .isDecimal()
  .withMessage("El precio debe ser decimal <i class='fa-solid fa-triangle-exclamation'></i>");
  
  const fieldSku = check('sku')
  .notEmpty()
  .withMessage('El sku es requerido <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  .isNumeric()
  .withMessage('El sku debe ser un numero <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  .isInt({ min: 0 })
  .withMessage('El sku debe ser positivo <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  
  const fieldCategory = check('categoryId')
  .notEmpty()
  .withMessage('La categoria debe estar especificada <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  
  const fieldAvailable = check('available')
  .notEmpty()
  .withMessage('La disponibilidad debe estar especificada <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  
  const fieldStock = check('stock')
  .notEmpty()
  .withMessage('El stock es requerido <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  .isNumeric()
  .withMessage('El stock debe ser un numero <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  .isInt({ min: 0 })
  .withMessage('El stock debe ser positivo <i class="fa-solid fa-triangle-exclamation"></i>')
  .bail()
  
  const defaultValidationFiels = [
    fieldName,fieldPrice,fieldSku,fieldCategory,fieldAvailable,fieldStock
  ];
  
  module.exports = {
    productsValidationStore: [
      ...defaultValidationFiels,
    ],
    productsValidationUpdate: [
      ...defaultValidationFiels,
    ],
  };