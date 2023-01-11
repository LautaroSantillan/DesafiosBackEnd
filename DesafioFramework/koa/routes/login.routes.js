const express = require("express");
const passport = require('../services/passport.js');
const { getLogin, postLogin } = require("../controllers/login.controllers.js");
/* -------- ------------ */
const { Router } = express;
const routes = Router();
/* -------------- LOGIN ------------- */
routes.get('/', getLogin );
routes.post('/', passport.authenticate('login', {failureRedirect:'/faillogin'}) , postLogin );

module.exports = routes;
