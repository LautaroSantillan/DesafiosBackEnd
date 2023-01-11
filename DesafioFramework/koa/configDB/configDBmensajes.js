const { optionsSQLite3 } = require('../connections/conexionDB.js')
const knex = require('knex')(optionsSQLite3)

const crearTablaMensajes = async (nombreDB) =>{
    try {
        await knex.schema.createTable(nombreDB, table =>{
            table.increments('id')
            table.string('author')
            table.string('text')
            table.string('fecha')
        })
        console.log('Tabla creada');       
        await knex.destroy(); 
    } catch (error) {
        console.log(error);
    }
}
//crearTablaMensajes('mensajes')

const seleccionarMensajes = async (nombreBD, campo) =>{
    try {
        const resp = await knex.from(nombreBD).select(campo)
        return resp
        
    } catch (error) {
        console.log(error);    
    }
}

const seleccionarMensajesCuando = async (nombreBD, campo, campoWhere, op, cond) =>{
    try {
        const resp = await knex.from(nombreBD).select(campo).where(campoWhere, op ,cond)//.orderBy('id', 'desc')
        return resp       
        //await knex.destroy(); 
    } catch (error) {
        console.log(error);    
    }
}

const insertarMensajes = async(nombreBD, obj) =>{
    try {
        await knex(nombreBD).insert(obj)
        const mensaje = await knex(nombreBD).max('id')
        await knex.destroy(); 
    } catch (error) {
        console.log(error);
    }
}

const actualizarMensajes = async (nombreBD, camporWh, valorWh, obj) =>{
    try {
        await knex.from(nombreBD).where(camporWh, valorWh).update(obj)
        //console.log(resp);
        await knex.destroy(); 
    } catch (error) {
        console.log(error);    
    }
}
const eliminarMensajes = async (nombreBD, camporWh, op, valorWh) =>{
    try {
        await knex.from(nombreBD).where(camporWh, op , valorWh).del()
        await knex.destroy(); 
    } catch (error) {
        console.log(error);    
    }
}
const eliminarTodosMensajes = async (nombreBD) =>{
    try {
        await knex.from(nombreBD).del()
        //console.log(resp);
        await knex.destroy(); 
    } catch (error) {
        console.log(error);    
    }
}

module.exports = { 
    crearTablaMensajes,
    seleccionarMensajes,
    seleccionarMensajesCuando,
    insertarMensajes,
    actualizarMensajes,
    eliminarMensajes,
    eliminarTodosMensajes
}

