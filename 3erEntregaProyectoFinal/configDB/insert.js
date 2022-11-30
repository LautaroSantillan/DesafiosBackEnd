const { options } = require('../mariaDB/conexionDB')
const knex = require('knez')(options)


const insertar = async(nombreBD, obj) =>{
    try {
        await knex(`${nombreBD}`).insert({ obj })
    } catch (error) {
        console.log(error);
    }
}

module.export = { insertar }