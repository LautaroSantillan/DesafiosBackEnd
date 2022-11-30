const express = require("express");
const logger = require("../utils/logger.js");
const { Router } = express;
const passport = require('../services/passport.js');
const upload = require("../middlewares/uploadsFiles.middleware.js");
const { sendEmailNewUser } = require("../services/nodeMailer.js");

const router = Router();

/* ------------- SIGNUP ------------- */
router.get('/signup', (req,res) =>{
    try {
        logger.info('GET /signup');
        res.render('signup');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});
router.post('/signup', passport.authenticate('signup', {failureRedirect:'/failsignup'}) , async (req,res)=>{
    try {
        logger.info('POST /signup')
        let user = req.user
        await sendEmailNewUser(user)
        res.redirect('/');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});
/* ------ falla el signup --------  */
router.get('/failsignup',(req,res)=>{   
    try {
        logger.info('GET /failsignup');
        res.render('signup-error', {} ); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});
router.post('/failsignup', upload.single('avatar'), passport.authenticate('signup', {failureRedirect:'/failsignup'}) , (req,res)=>{
    try {
        logger.info('POST /failsignup');
        let user = req.user
        sendEmailNewUser(user)
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