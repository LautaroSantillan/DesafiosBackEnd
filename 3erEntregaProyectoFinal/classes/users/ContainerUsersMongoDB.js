const mongoose = require('mongoose');
const logger = require('../../utils/logger');

class UsersMongoDB{
    constructor(nombreColeccion, esquema){
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }
    async buscarUsuarios (username) {
        try {
            logger.info('Buscando usuario')
            let usuario = await this.coleccion.findOne({userEmail:username});
            if(usuario){
                logger.info('Usuario encontrado')
                return usuario;
            }else{
                logger.info('Usuario NO encontrado')
                return null
            }
        } catch (error) {
            logger.error('Error al buscar usuario en la base de datos Mongo: ' + error );
        }
    }
    async crearUsuario (usuario) {
        try {
            const crearUsuario = await this.coleccion.create(usuario)
            logger.info('Estamos creando el usuario');
            logger.info(crearUsuario._id.toString())
            return crearUsuario
        } catch (error) {
            logger.error('Error al crear el usuario: ' + error);
        }
    }
}

module.exports = UsersMongoDB