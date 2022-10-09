const authMiddleware = async (req, res, next) =>{
    const { userName, userPassword } = req.session;
    if( userName && userPassword){
        return next();
    }else{
        return res.redirect('/login');
    }
}

module.exports = authMiddleware;