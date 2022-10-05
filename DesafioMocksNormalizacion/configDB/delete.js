const { options } = require('../mariaDB/conexionDB')
const knex = require('knez')(options)

const borrar = async (nombreBD) =>{
    try {
        await knex.from(`${nombreBD}`).del()
    } catch (error) {
        console.log(error);    
    }
}
const borrarCuando = async (nombreBD, campoWh , op , valorWh) =>{
    try {
        await knex.from(`${nombreBD}`).where(`${campoWh}`, `${op}`, `${valorWh}`).del()
    } catch (error) {
        console.log(error);    
    }
}

module.export = { borrar, borrarCuando }
