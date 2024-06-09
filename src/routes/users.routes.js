const express = require("express");
const router = express.Router();
const { favorite, profile } = require("../controllers/users");

router.get("/favoritos", favorite);
router.get("/perfil/:id", profile);

module.exports = router;
