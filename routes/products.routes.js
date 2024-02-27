const express = require("express");
const router = express.Router();
const prodController = require("../controllers/products");

router.get("/detalle", prodController.detail);
router.get("/registro-producto", prodController.registroProducto);
router.get("/editarProducto", prodController.editarProducto)
router.get("/lista-productos", prodController.listaProductos)
module.exports = router;