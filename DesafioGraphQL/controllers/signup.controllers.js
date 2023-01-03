const logger = require("../utils/logger.js");

const getSignup = async (req,res)=>{
    try {
        logger.info('GET /signup')
        res.render('signup');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

const postSignup = async (req,res)=>{
    try {
        logger.info('POST /signup')
        res.redirect('/');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

const getFailSignup = (req,res)=>{   
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
}

const postFailSignup = async (req,res)=>{
    try {
        logger.info('POST /failsignup');
        res.redirect('/');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

module.exports = { getSignup, postSignup, getFailSignup , postFailSignup }