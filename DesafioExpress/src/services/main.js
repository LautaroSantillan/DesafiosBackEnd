const fs = require('fs/promises');

class Contenedor {
    constructor(){}
    //Metodo para retornar todos los objs que haya en el []
    async getAll(){
        try{
            const products = await fs.readFile('../DB/productos.json', 'utf-8');
            return (JSON.parse(products));
        }
        catch(error){
            console.log(`Error al leer: ${error}`);
        }
    }
}

module.exports = Contenedor; 