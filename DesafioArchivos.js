const fs = require('fs/promises'); //Importar
//CLASE
class Contendor {
    constructor(rutaFile){
        this.rutaFile = rutaFile;
    }
    //Metodo para guardar el nuevo obj y retornar el id
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

            await fs.writeFile(this.rutaFile, JSON.stringify(objs, null, 2));

            return newId;
        } catch (error) {
            console.log(`Error al guardar: ${error}`);
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
            console.log(`Error al obtener el producto: ${error}`);
        }
    }
    //Metodo para retornar todos los objs que haya en el []
    async getAll(){
        try{
            const products = await fs.readFile(this.rutaFile, 'utf-8');
            return (JSON.parse(products));
        }
        catch(error){
            console.log(`Error al leer: ${error}`);
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
                await fs.writeFile(this.rutaFile, JSON.stringify(objs, null, 2)); 
            }
        } catch (error) {
            return console.log(`No se pudo eliminar el producto: ${error}`);
        }
    }
    //Metodo para eliminar todos los objs del []
    async deleteAll(){
        try {
            const objs = await this.getAll();

            if(objs.length == 0){
                return console.log("Array vacio");
            } else {
                await fs.writeFile(this.rutaFile, JSON.stringify([], null, 2));
            }
        } catch (error) {
            console.log(`Error al eliminar todo: ${error}`);
        }
    }
}
//PRUEBA
async function main(){
    const Prueba = new Contendor('./DataBase/product-data.json');
    console.log(await Prueba.save({title: "Coca-Cola", price: 180, thumbnail: "https://www.cocacola.es/content/dam/one/es/es2/coca-cola/products/productos/dic-2021/CC_Origal.jpg"}));
    console.log(await Prueba.save({title: "Pepsi", price: 150, thumbnail: "https://www.boulevard-sa.com.ar/Site/img/products/pepsi/Pepsi-350-V-L.jpg"}));
    console.log(await Prueba.save({title: "Manaos", price: 120, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_716200-MLA43739181284_102020-O.jpg"}));
    console.log(await Prueba.getById(3));
    console.log(await Prueba.deleteById(3));
    //console.log(await Prueba.deleteAll());
    console.log(await Prueba.getAll());
}
main();