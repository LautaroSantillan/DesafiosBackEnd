const express = require("express");
const { Router } = express;
const checkAuth = require("../middlewares/auth.middleware.js");
const logger = require("../utils/logger.js");

const router = Router();

router.get('/admin', checkAuth ,(req,res)=>{
    try {
        logger.info('GET /admin')
        if(req.user){
            let user = req.user;
            res.render('admin', {user} );
        }else{
            res.redirect('/login');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
});

router.post('/admin', checkAuth , async (req, res) =>{
    const logout = !req.body
    try{
        logger.info('POST /admin')
        if(!logout){
            res.status(200).redirect('/logout' )
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})

module.exports = router;