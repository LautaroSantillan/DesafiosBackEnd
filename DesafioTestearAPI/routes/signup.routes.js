const express = require("express");
const { Router } = express;
const passport = require('../services/passport.js');
const { getSignup, postSignup } = require("../controllers/signup.controllers.js");
const routes = Router();
/* ------------- SIGNUP ------------- */
routes.get('/', getSignup);
routes.post('/', passport.authenticate('signup', {failureRedirect:'/failsignup'}) , postSignup);

module.exports = routes;