const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const bCrypt = require("bcrypt");
const { buscarUsuarios, crearUsuario } = require('../config/mongoConection');

/* ---------- SERIALIZE --------- */

passport.serializeUser(function (user, done) {
    console.log("serialize user");
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log("deserialize user");
    done(null, user);
});

/* ----- FUNCIONES -------- */

const isValidPassword = (user,password) =>{
    return bCrypt.compareSync(password, user.password);
}

const createHash = (password) => {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    )
}

/* ------ MIDDLEWARES ------- */
passport.use(
    'login' ,
    new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await buscarUsuarios(username);
            if (user) {
                if ( isValidPassword(user, password) ) {
                    return done(null, user);
                } else {
                    console.log("password incorrecto");
                    return done(null, false);
                }
            } else {
                console.log(`Usuario ${username} no encontrado`);
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
                let usuario = await buscarUsuarios(username);
                if( usuario) {
                    console.log('Usuario existente');
                    return done (null, false);
                }else{
                    console.log('pasamos a crearlo');
                    const { username, password} = req.body;
                    const nuevoUsuario = await crearUsuario({
                        userEmail: username ,
                        password: createHash(password)
                    })
                }
                console.log('usuario creado ');
                return done(null, req.body);
            } catch (error) {
                console.log( 'Error en el strategy de signup' , error);
            }
        }
    )
)

module.exports = passport;