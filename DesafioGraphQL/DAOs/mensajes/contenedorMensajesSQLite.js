const fs = require('fs');
const {
    seleccionarMensajes,
    seleccionarMensajesCuando,
    insertarMensajes, 
    actualizarMensajes,
    eliminarMensajes,
    eliminarTodosMensajes, 
    crearTablaMensajes
} = require('../../configDB/configDBmensajes.js');

class ContenedorMensajesSQLite{
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        
        try{
            insertarMensajes('mensajes', obj)
            return {
                msg: `Se ha insertado el mensaje`,
                obj
            }
        }catch(error){
            console.log(error);
        }
    }
    async updateById(obj){
        try{
            const mensajes = seleccionarMensajes('mensajes', '*')  
            const msjIndex = mensajes.findIndex(msj => msj.id === obj.id)
            if (msjIndex.length !== -1){
                actualizarMensajes('mensajes', 'id' , obj.id , obj )
                return {
                    msg: `Se ha actualizado el mensaje ${obj.id}`,
                    obj
                }
            } else{
                return {error: "No existe el producto"}
            } 
        }catch(error){
            console.log(error);
        }
    }
    async getById(id){
        try{
            const mensaje = await seleccionarMensajesCuando('productos', '*', 'id', '=', id)
            if(mensaje){
                return mensaje
            }else{
                console.log("No se encontró un mensaje con ese ID");
                return null
            }
        }catch(error){
            console.log(error);
        }
    }
    async getAll(){
        try{
            const mensajes = await seleccionarMensajes('mensajes', '*')
            if(mensajes){
                return mensajes
            }else{            
                console.log("No hay mensaje en el contenedor");
                return null
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteById(id){
        try{
            const mensaje = await seleccionarMensajes('mensajes', '*', 'id', '=', id)
            if(mensaje){
                await eliminarMensajes('mensajes', 'id' , '=' , id)
                console.log("Mensaje Eliminado");
            }else{
                console.log("No se encuentra el mensaje");
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteAll(){
        try{
            const mensajes = await seleccionarMensajesCuando('mensajes', '*')
            if(mensajes){
                await eliminarTodosMensajes('mensajes') 
                console.log("Mensajes eliminados");
            }else{
                console.log("No hay mensaje para eliminar");
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = ContenedorMensajesSQLite