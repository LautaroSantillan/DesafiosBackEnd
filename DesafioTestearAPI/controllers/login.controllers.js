const logger = require("../utils/logger")
const puerto = require("../config/puerto.js");

const getLogin = async (req,res)=>{
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
}

const postLogin = async (req,res)=>{
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
}

const getFailLogin = async (req,res)=>{
    try {
        logger.info(`GET /faillogin`)
        res.render('login-error' );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

const postFailLogin = async (req,res)=>{
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
}

module.exports = {
    getLogin ,
    postLogin , 
    getFailLogin , 
    postFailLogin

}