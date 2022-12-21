const { options } = require('../mariaDB/conexionDB')
const knex = require('knez')(options)

const seleccionar = async (nombreBD, campo) =>{
    try {
        const resp = await knex.from(`${nombreBD}`).select(`${campo}`)
        for (obj of resp){
            console.log(obj);
        }
    } catch (error) {
        console.log(error);    
    }
}

module.export = { seleccionar }