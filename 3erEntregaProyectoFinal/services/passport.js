/* --------------------------- Modulos ----------------------------*/
const logger = require('../utils/logger');
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const bCrypt = require("bcrypt");
/* ---------------- Config User ----------------- */
const { usersDao } = require('../dao/index.dao');
/* -------------- Serializacion --------------- */
passport.serializeUser(function (user, done) {
    console.log("serialize user");
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log("deserialize user");
    done(null, user);
});

/*  ----------- Function -------------- */
const isValidPassword = (user,password) =>{
    return bCrypt.compareSync(password, user.password)
};

const createHash = (password) => {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    )
};

/* --------------------------------- Middlewares ------------------------------------*/
passport.use(
    'login' ,
    new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await usersDao.buscarUsuarios(username)
            if (user) {
                if ( isValidPassword(user, password) ) {
                    return done(null, user);
                } else {
                    console.log("password incorrecto");
                    return done(null, false);
                }
            } else {
                console.log(`Usuario ${username} no encontrado`)
                return done(null, false);
            }
        } catch (error) {
            console.log(error);
        }   
    })
)
passport.use(
    'signup',
    new LocalStrategy(
        {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {

                let usuario = await usersDao.buscarUsuarios(username)

                if( usuario) {
                    console.log('Usuario existente');
                    return done (null, false)
                }else{
                    console.log('pasamos a crearlo');
                    //const { username, password} = req.body
                    const { username, password, name , phone , age , address , avatar} = req.body 
                    const nuevoUsuario = await usersDao.crearUsuario({
                        userEmail: username ,
                        password: createHash(password),
                        name: name,
                        phone: phone,
                        age: age,
                        address: address,
                        avatar: avatar
                    })
                }
                console.log('usuario creado ');

                return done(null, req.body)

            } catch (error) {
                console.log( 'Error en el strategy de signup' , error);
            }
        }
    )
)

module.exports = passport;