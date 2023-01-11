const express = require("express");
const { Router } = express;
const passport = require('../services/passport.js');
const { getFailSignup, postFailSignup } = require("../controllers/signup.controllers.js");

const router = Router();

/* ------ FAIL SIGNUP --------  */
router.get('/', getFailSignup);
router.post('/', passport.authenticate('signup', {failureRedirect:'/failsignup'}) , postFailSignup );

module.exports = router;