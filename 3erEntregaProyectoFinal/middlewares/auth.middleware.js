const logger = require("../utils/logger");

const checkAuth = (req,res,next) =>{
    if(req.isAuthenticated()){
        logger.info('Autenticado por middlware auth');
        next()
    }else{
        logger.info('no autenticado por middlware auth');
        res.redirect('/login')
    }
}

module.exports = checkAuth