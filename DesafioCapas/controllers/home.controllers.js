const logger = require("../utils/logger")

const getHome = async (req,res)=>{
    try {
        logger.info('GET /home')
        if(req.user){
            let username = req.user.userEmail;
            res.render('home',{username:username});
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
}

const postHome = async (req, res) =>{
    const logout = !req.body
    try{
        logger.info('POST /home')
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
}

module.exports = { getHome , postHome }