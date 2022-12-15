const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST} = process.env

const connectMongoDB = async () =>{
    try {
        const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected');

    } catch (error) {
        console.log(error);
    }
}
connectMongoDB()

const Users = mongoose.model('usuarios', {
    userEmail: {
        type: String, 
        required: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true,
        trim: true
    },
})

const buscarUsuarios = async (username) => {
    try {
        let usuario = await Users.findOne({userEmail:username});
        if(usuario){
            return usuario;
        }else{
            return null
        }
    } catch (error) {
        console.log('Error al buscar usuario en la base de datos Mongo: ' + error );
    }
}

const crearUsuario = async (usuario) => {
    try {
        const crearUsuario = await Users.create(usuario)
        console.log('Estamos creando');
        console.log(crearUsuario._id.toString())
        return crearUsuario
    } catch (error) {
        console.log('Error al crear el usuario: ' + error);
    }
}

module.exports = { buscarUsuarios, crearUsuario }