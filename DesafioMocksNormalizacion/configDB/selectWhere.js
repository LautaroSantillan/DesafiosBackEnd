const { options } = require('../mariaDB/conexionDB')
const knex = require('knez')(options)

const selectWhere = async (nombreBD, campo, campoWhere, op, cond) =>{
    try {
        const resp = await knex.from(`${nombreBD}`).select(`${campo}`).where(`${campoWhere}`,`${op}`,`${cond}`).orderBy('id', 'desc')
        for (obj of resp){
            console.log(obj);
        }
    } catch (error) {
        console.log(error);    
    }
}

module.export = { selectWhere }