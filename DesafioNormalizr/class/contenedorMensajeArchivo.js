const fs = require('fs')

class ContenedorMensaje{
    constructor(ruta){
        this.ruta = ruta
    }
    async save(obj){
        try{
            let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataArchivoParse = await JSON.parse(dataArchivo);
            if(dataArchivoParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify( [...dataArchivoParse, {...obj }], null, 2))
                console.log(`El ID del mensaje cargado es ${dataArchivoParse[dataArchivoParse.length-1].id + 1}`);
                return {
                    msg: `Se ha cargado el mensaje`,
                    obj
                }

            }else{
                await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj }], null, 2))
                console.log(`El ID del mensaje cargado es 1`);
                return {
                    msg: `Se ha cargado el mensaje`,
                    obj
                }
            } 
        }catch(error){
            console.log(error);
        }
    }
    async updateById(obj){
        try{
            let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataArchivoParse = await JSON.parse(dataArchivo);
            const objIndex = dataArchivoParse.findIndex(msj => msj.id === obj.id)
            if (objIndex.length !== -1){
                dataArchivoParse[objIndex] = obj;
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchivoParse, null, 2));
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
            let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataArchivoParse = JSON.parse(dataArchivo);
            let producto = dataArchivoParse.find(msj => msj.id === id)
            if(producto){
                console.log(producto);
                return producto
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
            let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataArchivoParse = JSON.parse(dataArchivo);
            if(dataArchivoParse.length){
                return dataArchivoParse
            }else{
                console.log("No hay mensaje en el contenedor");
                //return null
                return dataArchivoParse
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteById(id){
        try{
            let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataArchivoParse = JSON.parse(dataArchivo);
            let producto = dataArchivoParse.find(mensaje => mensaje.id === id)
            if(producto){
                const dataArchivoParseFiltrado = dataArchivoParse.filter(mensaje => mensaje.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchivoParseFiltrado, null, 2), 'utf-8')
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
            let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataArchivoParse = JSON.parse(dataArchivo);
            if(dataArchivoParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify([]), null, 2 , 'utf-8')
                console.log("Mensaje eliminados");
            }else{
                console.log("No hay mensaje para eliminar");
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = ContenedorMensaje