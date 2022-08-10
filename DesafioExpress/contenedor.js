const fs = require('fs/promises');

class Contenedor {
    constructor(){}
    //Metodo para retornar todos los objs que haya en el []
    async getAll(){
        try{
            const products = JSON.parse(await fs.readFile('./productos.json', 'utf-8'));
            return products;
        }
        catch(error){
            console.log(`Error al leer: ${error}`);
        }
    }
    //Metodo para retornar un obj random
    async getRandom(){
        try{
            const objs = await this.getAll();
            
            let random = objs[Math.floor(Math.random() * objs.length)];

            return random;
        } catch (err) {
            return console.log(`No se obtuvo el producto random: ${error}`);
        }
    }
}

module.exports = Contenedor; 