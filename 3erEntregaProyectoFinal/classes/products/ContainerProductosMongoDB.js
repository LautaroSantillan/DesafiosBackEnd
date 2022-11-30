const mongoose = require('mongoose');
const logger = require('../../utils/logger');

class ProductosMongoDB{
    constructor(nombreColeccion, esquema){
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }
    async save(obj){
        try{
            const nuevoProducto = await this.coleccion.create(obj)
            if(nuevoProducto){
                logger.info(`Producto cargado correctamente`);
                return nuevoProducto
            }
        }catch(error){
            logger.error('Error ejecutar save' , error);
        }
    }
    async updateById(obj){
        try{
            const id = obj.id
            const producto = await this.coleccion.findById({_id: id})

            if (producto){
                const productoActualizado = await this.coleccion.findByIdAndUpdate({_id: id}, obj, {
                    new: true,
                    runValidators: true
                })
                logger.info(`Se ha actualizado el producto ${obj.id}`)
                return productoActualizado
            } else{
                return {error: "No existe el producto"}
            } 
        }catch(error){
            logger.error('Error al ejecutar updateById' , error);
        }
    }
    async getById(id){
        try{
            const producto = await this.coleccion.findById({_id: id})
            if(producto){
                logger.info("Se encontró producto con ese ID");
                return producto
            }else{
                logger.info("No se encontró un producto con ese ID");
                return null
            }
        }catch(error){
            logger.error('Error al ejecutar getById' , error);
        }
    }
    async getAll(){
        try{
            const productos = await this.coleccion.find({})
            if(productos.length){
                logger.info(`Se han encontrado productos en MongoDB`);
                return productos
            }else{
                logger.info(`No se han encontrado productos en MongoDB`);
                return null
            }
        }catch(error){
            logger.error('Error al ejecutar getAll' , error);
        }
    }
    async deleteById(id){
        try{
            const producto = await this.coleccion.findById({_id: id})
            if(producto){
                await this.coleccion.findByIdAndDelete(id)
                logger.info(`Producto eliminado ${id}`);
                return {
                    msg: `Se ha eliminado el producto `
                }
            }else{
                logger.info(`No se encuentra el producto para eliminar con ID: ${id}`);
            }
        }catch(error){
            logger.error('Error al ejecutar deleteById' , error);
        }
    }
    async deleteAll(){
        try{
            const productos = await this.coleccion.find()
            if(productos.length){
                await this.coleccion.deleteMany({})
                logger.info("Productos eliminados");
            }else{
                logger.info("No hay productos para eliminar");
            }
        }catch(error){
            logger.error('Error al ejecutar deleteAll' , error);
        }
    }
}

module.exports = ProductosMongoDB