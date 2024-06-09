// ************ Require's ************
const express = require("express");
const router = express.Router();
const { uploadAuthentication } = require("../middlewares/uploadFiles");
const {usersValidationStore,usersValidationUpdate} = require("../middlewares/validations")

// ************ Controller Require ************
const {
  registro,
  registro1,
  registro2,
  login,
  edit,
  update,
  loginProcess,
  errorAuth,
  logout,
} = require("../controllers/authentication");

//const { updateUserValidation } = require("../middlewares/validations");
const { userValidation } = require("../middlewares/validations");
const { uploadUserPicture } = require("../middlewares/uploadUserPicture");


//*** CREATE ONE USER ***/
//router.get("/crear-usuario/", add);

// /autenticacion/registrar
router.get("/registro", registro);
router.post("/registro",uploadUserPicture.fields([{ name: "userPicture", maxCount: 1 }]),userValidation , registro1);
router.get("/registro-completado", registro2);   

// /autenticacion/login
router.get("/login", login);
router.post("/login", loginProcess);
router.post("/error", errorAuth);

//*** EDIT ONE USER ***/
router.get("/editar-usuario/:id", edit);
router.put("/editar-usuario/:id", uploadAuthentication.single("userPicture"),usersValidationUpdate, update);

//*** DELETE ONE USER ***/
//router.delete('/eliminar-usuario/:id', destroy);

router.get("/cerrar-sesion", logout);

module.exports = router;
