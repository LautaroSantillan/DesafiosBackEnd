const fs = require('fs/promises')

class Contenedor {
    constructor() {}
    //Método para guardar el producto
    async save(prod){
        try {
            const objs = await this.getAll();
            
            let newId;
            if(objs.length == 0){
                newId = 1;
            } else {
                newId = objs[objs.length - 1].id + 1;
            }

            const newProd = {id: newId, ...prod};
            objs.push(newProd);

            await fs.writeFile('./productos.json', JSON.stringify(objs, null, 2));

            return `El id del objeto añadido es ${newId}`;
        } catch (error) {
            console.log(`ERROR AL GUARDAR: ${error}`);
        }
    }
    //Metodo para retornar el obj del id ingresado
    async getById(id){
        try {
            const objs = await this.getAll();

            const idObj = objs.find(obj => {
                return obj.id == id
            });
            if (idObj == undefined) {
                console.log(`No se pudo encontrar el producto con id ${id}`);
                return null;
            } else {
                return console.log(idObj);
            }
        } catch (error) {
            console.log(`ERROR AL OBTENER EL PRODUCTO ${id}: ${error}`);
        }
    }
    //Metodo para retornar todos los objs que haya en el []
    async getAll(){
        try{
            const products = await fs.readFile('./productos.json', 'utf-8');
            return (JSON.parse(products));
        }
        catch(error){
            console.log(`ERROR AL LEER: ${error}`);
        }
    }
    //Metodo para eliminar obj con id del [] 
    async deleteById(id){
        try {
            const objs = await this.getAll();

            const indexObj = objs.findIndex((obj)=> obj.id == id);
            if (indexObj == -1) {
                return console.log(`No se pudo encontrar el producto con id ${id}`);
            } else {
                objs.splice(indexObj, 1);
                await fs.writeFile('./productos.json', JSON.stringify(objs, null, 2)); 
            }
        } catch (error) {
            return console.log(`NO SE PUDO ELIMINAR EL PRODUCTO ${id}: ${error}`);
        }
    }
    //Método para actualizar un producto según ID
    async update(id, obj){
        try {
            const objs = await this.getAll();

            const indexObj = objs.findIndex((obj)=> obj.id == id);
            if (indexObj == -1) {
                return console.log(`No se pudo encontrar el producto con id ${id}`);
            } else {
                objs[indexObj] = obj;
                return (obj);
            }
        } catch (error) {
            return console.log(`NO SE PUDO ACTUALIZAR EL PRODUCTO ${id}: ${error}`);
        }
    }
}

module.exports = Contenedor;