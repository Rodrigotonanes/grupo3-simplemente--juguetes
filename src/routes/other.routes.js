const express = require("express");
const router = express.Router();
const { home, dashboard, search, about } = require("../controllers/other");

router.get("/", home);
router.get("/home", home);
router.get("/dashboard", dashboard);
router.get("/buscar", search);
router.get("/sobre-nosotros", about);

module.exports = router;
