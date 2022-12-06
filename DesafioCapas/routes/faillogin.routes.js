const express = require("express");
const passport = require('../services/passport.js');
const { Router } = express;
const { getFailLogin, postFailLogin } = require("../controllers/login.controllers.js");
const routes = Router();
/* -------------- FAIL LOGIN ------------- */
routes.get('/faillogin', getFailLogin);
routes.post('/faillogin', passport.authenticate('login', {failureRedirect:'/faillogin'}) , postFailLogin  )

module.exports = routes