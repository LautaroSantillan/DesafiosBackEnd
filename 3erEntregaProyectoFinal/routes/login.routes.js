const express = require("express");
const puerto = require("../config/puerto.js");
const passport = require('../services/passport.js');
const logger = require("../utils/logger.js");
/* -------- ------------ */
const { Router } = express;
const router = Router();
/* -------------- LOGIN ------------- */
router.get('/login',(req,res)=>{
    try {
        logger.info(`GET /login | process: ${process.pid}, puerto: ${puerto}`);
        if(req.isAuthenticated()){
            logger.info('user logeado');
            res.redirect('/');
        }else{
            logger.info('usuario NO logeado');
            res.render('login');
        }  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});
router.post('/login',passport.authenticate('login', {failureRedirect:'/faillogin'}) ,(req,res)=>{
    try {
        logger.info(`POST /login`)
        res.redirect('/');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});
/*  ---- falla login ---- */
router.get('/faillogin',(req,res)=>{
    try {
        logger.info(`GET /faillogin`)
        res.render('login-error',{});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});

router.post('/faillogin',passport.authenticate('login', {failureRedirect:'/faillogin'}) ,(req,res)=>{
    try {
        logger.info(`POST /faillogin`)
        res.redirect('/');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});

module.exports = router;
