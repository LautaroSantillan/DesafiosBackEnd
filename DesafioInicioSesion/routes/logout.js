const express = require("express");
const { Router } = express;
const router = Router();

router.get('/logout', async (req, res) =>{
    try{
        const logout = () => {
            req.session.destroy();
        }
        setTimeout(
            logout, 2000
        )
        if(req.user){
            let username = req.user.userEmail;
            console.log(username);
            res.render('logout', {username: username});
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;