const { check, body } = require("express-validator");
const path = require("path");

// Validador formato de imagen
const regExpFiles = /\.(png|jpg|jpeg|webp|gif)$/i;

// Validador de códigos postales Argentinos //Ejemplo C1000AAA (moderno) 1234 (antiguo)
const argentinaPostalCodeRegex = /^[A-Z]?\d{4}[A-Z]{0,3}$/;

// validador de cadena de texto //Permite tilde y caracteres especiales
const stringValidatorRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00e0-\u00fc\u00c0-\u00dc0-9\s.]+$/;

const fieldName = check("name")
  .notEmpty()
  .withMessage(
    'El nombre y apellido es requerido'
  )
  .bail()
  .isAlphanumeric("es-ES", { ignore: " .," })
  .withMessage("El nombre y apellido debe ser alfanumérico")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("El nombre y apellido debe tener un mínimo de 5 caracteres");

const fieldPostal = check("postal")
  .optional({ checkFalsy: true })
  .matches(argentinaPostalCodeRegex)
  .withMessage("El código postal no es válido para Argentina");

const fieldStreet = check("street")
  .optional({ checkFalsy: true })
  .matches(stringValidatorRegex)
  .withMessage("La dirección debe ser alfanumérico")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("La dirección debe tener un mínimo de 5 caracteres");

const fieldStreetNumber = check("streetNumber")
  .optional({ checkFalsy: true })
  .isInt({ min: 1 })
  .withMessage("La numeración debe ser un número entero positivo")
  .bail()
  .custom((value, { req }) => {
    if (value < 1 || value > 9999) {
      throw new Error("La numeración debe debe tener un valor entre 1 y 9999");
    }
    return true;
  });

const fieldFloor = check("floor")
  .optional({ checkFalsy: true })
  .isInt({ min: 1 })
  .withMessage("El número de piso debe ser un número entero positivo")
  .bail()
  .custom((value, { req }) => {
    if (value < 1 || value > 200) {
      throw new Error("El número de piso debe estar entre 1 y 200");
    }
    return true;
  });

const fieldBetweenSt1 = check("betweenSt1")
  .optional({ checkFalsy: true })
  .matches(stringValidatorRegex)
  .withMessage("La dirección debe ser alfanumérico ")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("La dirección debe tener un mínimo de 5 caracteres");

const fieldBetweenSt2 = check("betweenSt2")
  .optional({ checkFalsy: true })
  .matches(stringValidatorRegex)
  .withMessage("La dirección debe ser alfanumérico")
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("La dirección debe tener un mínimo de 5 caracteres");

const fieldPhoneNumber = check("phoneNumber")
  .optional({ checkFalsy: true })
  .isMobilePhone("es-AR") // 'es-AR' es el locale para Argentina
  .withMessage("El número de teléfono no es válido");

const fieldIndications = check("indications")
  .optional({ checkFalsy: true })
  .matches(stringValidatorRegex)
  .withMessage(
    "Los datos adicionales debe ser alfanumérico"
  )
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage("Los datos adicionales debe tener un mínimo de 5 caracteres");

const fieldUserPictureStore = body("userPicture").custom((value, { req }) => {
  const lengthImages = req.files?.userPicture?.length;

  if (!lengthImages) throw new Error("Debes ingresar una imagen");
  else {
    if (lengthImages > 1)
      throw new Error("No puedes ingresar mas de 1 archivo");

    const extFile = path.extname(req.files.userPicture[0].originalname);
    const isFormatSuccess = regExpFiles.test(extFile);

    if (!isFormatSuccess)
      throw new Error("El formato de la imagen es invalido");
  }
  return true;
});

const fieldUserPictureUpdate = body("userPicture").custom((value, { req }) => {
  const lengthImages = req.files?.userPicture?.length;
  if (lengthImages) {
    if (lengthImages > 1) {
      throw new Error("No puedes ingresar mas de 1 archivo");
    }
    const extFile = path.extname(req.files.userPicture[0].originalname);
    const isFormatSuccess = regExpFiles.test(extFile);
    if (!isFormatSuccess) {
      throw new Error("El formato de la imagen es invalido");
    }
  }
  return true;
});

const defaultValidationFiels = [
  fieldName,
  fieldPostal,
  fieldStreet,
  fieldStreetNumber,
  fieldFloor,
  fieldBetweenSt1,
  fieldBetweenSt2,
  fieldPhoneNumber,
  fieldIndications,
];

module.exports = {
  usersValidationStore: [...defaultValidationFiels, fieldUserPictureStore],
  usersValidationUpdate: [...defaultValidationFiels, fieldUserPictureUpdate],
};
