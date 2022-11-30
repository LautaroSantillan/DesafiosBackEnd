const { options } = require('../mariaDB/conexionDB')
const knex = require('knez')(options)

const updateWhere = async (nombreBD, camporWh, valorWh, valorUpd) =>{
    try {
        const resp = await knex.from(`${nombreBD}`).where(`${camporWh}`, `${valorWh}`).update({
            camporWh : valorUpd
        })
        for (obj of resp){
            console.log(obj);
        }
    } catch (error) {
        console.log(error);    
    }
}

module.export = { updateWhere }