const { optionsMySQL } = require('../connections/conexionDB.js')
const knex = require('knex')(optionsMySQL)

const crearTablaProductos = async (nombreDB) =>{
    try {
        await knex.schema.createTable(nombreDB, table =>{
            table.increments('id').primary().notNullable()
            table.string('title').notNullable()
            table.string('thumbnail').notNullable()
            //table.string('description' , 250).notNullable()
            //table.string('code', 50).notNullable()
            //table.string('timestamp', 100).notNullable()
            table.integer('price', 50).notNullable()
        })
        console.log('Tabla creada');       
        await knex.destroy(); 
    } catch (error) {
        console.log(error);
    }
}

const seleccionarProductos = async (nombreBD, campo) =>{
    try {
        const resp = await knex.from(nombreBD).select(campo)
        return resp
        await knex.destroy(); 
    } catch (error) {
        console.log(error);    
    }
}

const seleccionarProductosCuando = async (nombreBD, campo, campoWhere, op, cond) =>{
    try {
        const resp = await knex.from(nombreBD).select(campo).where(campoWhere, op ,cond)//.orderBy('id', 'desc')
        for (obj of resp){
            console.log(obj);
        }
        console.log(resp);
        await knex.destroy(); 
    } catch (error) {
        console.log(error);    
    }
}

const insertarProducto = async(nombreBD, obj) =>{
    try {
        await knex(nombreBD).insert(obj)
        const producto = await knex(nombreBD).max('id')
        console.log(producto);
        await knex.destroy(); 
    } catch (error) {
        console.log(error);
    }
}


const actualizarProducto = async (nombreBD, camporWh, valorWh, obj) =>{
    try {
        await knex.from(nombreBD).where(camporWh, valorWh).update(obj)
        //console.log(resp);
        await knex.destroy(); 
    } catch (error) {
        console.log(error);    
    }
}
const eliminarProducto = async (nombreBD, camporWh, op, valorWh) =>{
    try {
        await knex.from(nombreBD).where(camporWh, op , valorWh).del()
        await knex.destroy(); 
    } catch (error) {
        console.log(error);    
    }
}
const eliminarTodosProductos = async (nombreBD) =>{
    try {
        await knex.from(nombreBD).del()
        //console.log(resp);
        await knex.destroy(); 
    } catch (error) {
        console.log(error);    
    }
}



module.exports = { 
    crearTablaProductos,
    seleccionarProductos,
    seleccionarProductosCuando,
    insertarProducto,
    actualizarProducto,
    eliminarProducto,
    eliminarTodosProductos
}

