const express = require("express");
const checkAuth = require("../middlewares/auth.middleware.js");
const { Router } = express;
const router = Router();

router.get('/', checkAuth ,(req,res)=>{
    console.log('get /home');
    if(req.user){
        let username = req.user.userEmail;
        console.log(username);
        res.render('home',{username:username});
    }else{
        res.redirect('/login');
    }
});

router.post('/', checkAuth , async (req, res) =>{
    const logout = !req.body;
    try{
        if(!logout){
            res.status(200).redirect('/logout');
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;