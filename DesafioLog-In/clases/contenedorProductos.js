const fs = require('fs')

const { 
    crearTablaProductos, 
    seleccionarProductos, 
    seleccionarProductosCuando, 
    insertarProducto, 
    actualizarProducto,
    eliminarProducto,
    eliminarTodosProductos
} = require('../configDB/configDBproductos')


class ContenedorProductos{
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        try{
            insertarProducto('productos', obj)
            return {
                msg: `Se ha insertado el producto ${obj.title}`,
                obj
            }
        }catch(error){
            console.log(error);
        }
    }
    async updateById(obj){
        try{
            const productos = seleccionarProductos('productos', '*')  
            const prodIndex = productos.findIndex(prod => prod.id === obj.id)
            if (prodIndex.length !== -1){
                actualizarProducto('productos', 'id' , obj.id , obj )
                return {
                    msg: `Se ha actualizado el producto ${obj.id}`,
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
            const producto = await seleccionarProductosCuando('productos', '*', 'id', '=', id)
            if(producto){
                console.log(producto);
                return producto
            }else{
                console.log("No se encontró un producto con ese ID");
                return null
            }
        }catch(error){
            console.log(error);
        }
    }
    async getAll(){
        try{
            const productos = await seleccionarProductos('productos', '*')
            if(productos){
                return productos
            }else{
                console.log("No hay productos en el contenedor");
                return null
            } 
        }catch(error){
            console.log(error);
        }
    }
    async deleteById(id){
        try{
            const producto = await seleccionarProductosCuando('productos', '*', 'id', '=', id)
            if (producto){
                await eliminarProducto('productos', 'id' , '=' , id )
                return {
                    msg: `Se ha eliminado el producto ${id}`
                }
            }else{
                console.log("No se encuentra el producto");
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteAll(){
        try{
            const productos = await seleccionarProductos('productos', '*')
            if(productos){
                await eliminarTodosProductos('productos')
                console.log("Productos eliminados");
            }else{
                console.log("No hay productos para eliminar");
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = ContenedorProductos

