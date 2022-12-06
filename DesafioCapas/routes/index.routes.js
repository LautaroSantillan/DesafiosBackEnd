const express = require("express");
const { Router } = express;
const routes = Router();
/* --- require routes --- */
const home = require('./home.routes.js');
const infoCompress = require('./info-compress.routes.js');
const info = require('./info.routes.js');
const login = require('./login.routes.js');
const faillogin = require('./faillogin.routes.js');
const signup = require('./signup.routes.js');
const failSignup = require('./failsignup.routes.js');
const logout = require('./logout.routes.js');
const productosTest = require('./productos-test.routes.js');
const randoms = require('./randoms.routes.js');
/* --- config --- */
routes.use('/', home)
routes.use('/info-compress', infoCompress)
routes.use('/info', info)
routes.use('/login', login)
routes.use('/faillogin', faillogin)
routes.use('/signup', signup)
routes.use('/failsignup', failSignup)
routes.use('/logout', logout)
routes.use('/api/randoms', randoms)
routes.use('/productos-test', productosTest)

module.exports = routes