const express = require("express");
const { Router } = express;
const router = Router();
/* --------- gzip ------------- */
const compression = require('compression');
const logger = require("../utils/logger");
/* ---------  ------------- */
router.get('/user', compression() , async (req,res) =>{    
    try{
        logger.info('GET /user' )
        let user = req.user;
        res.status(200).render('user', {user})
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})

module.exports = router;