const express = require("express");
const { Router } = express;
const passport = require('./passport.js');
const router = Router();

/* -------------- LOGIN ------------- */
router.get('/login',(req,res)=>{
    console.log('get /login');
    if(req.isAuthenticated()){
        console.log('user logeado');
        res.redirect('/');
    }else{
        console.log('usuario NO logeado');
        res.render('login');
    }
});

router.post('/login',passport.authenticate('login', {failureRedirect:'/faillogin'}) ,(req,res)=>{
    console.log('post /login');
    res.redirect('/');
});

/* ---- FALLA LOGIN ---- */
router.get('/faillogin',(req,res)=>{
    console.log('get /faillogin');
    res.render('login-error',{});
});

router.post('/faillogin',passport.authenticate('login', {failureRedirect:'/faillogin'}) ,(req,res)=>{
    console.log('post /login');
    res.redirect('/');
});

module.exports = router;
