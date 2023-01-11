const express = require("express");
const checkAuth = require("../middlewares/auth.middleware.js");
const { Router } = express;
const getProductsTest = require("../controllers/productos-test.controllers.js");
const routes = Router();
/* ------------- PRODUCTOS TEST  ------------- */
routes.get('/', checkAuth , getProductsTest)

module.exports = routes