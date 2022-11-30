const express = require("express");
const logger = require("../utils/logger.js");
const { Router } = express;

const router = Router();

router.get('/logout', async (req, res) =>{
    try{
        logger.info('GET /logout')
        const logout = () => {
            req.session.destroy()
        }
        setTimeout(
            logout, 2000
        )
        if(req.user){
            let username = req.user.userEmail;
            console.log(username);
            res.render('logout', {username: username})
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