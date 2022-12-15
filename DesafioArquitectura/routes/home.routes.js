const express = require("express");
const { Router } = express;
const checkAuth = require("../middlewares/auth.middleware.js");
const { getHome, postHome } = require("../controllers/home.controllers.js");

const routes = Router();

routes.get('/', checkAuth , getHome);

routes.post('/', checkAuth , postHome )

module.exports = routes;