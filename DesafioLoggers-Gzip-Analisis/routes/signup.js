const express = require("express");
const { Router } = express;
const passport = require('./passport.js');
const router = Router();

/* ------------- SIGNUP ------------- */
router.get('/signup',(req,res)=>{
    console.log('get /signup');
    res.render('signup');
});

router.post('/signup', passport.authenticate('signup', {failureRedirect:'/failsignup'}) , (req,res)=>{
    console.log('post /signup');
    res.redirect('/');
});

/* ------ FALLA SIGNUP --------  */
router.get('/failsignup',(req,res)=>{
    console.log('get /failsignup');
    res.render('signup-error', {} ); 
});

router.post('/failsignup', passport.authenticate('signup', {failureRedirect:'/failsignup'}) , (req,res)=>{
    console.log('post /signup');
    res.redirect('/');
});

module.exports = router;