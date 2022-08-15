const fs = require('fs/promises')

class Contenedor {
    constructor() {
        this.countID = 0;
        this.content = [];
        this.init();
    }
    //Iniciar archivo
    async init() {
        try {
			let data = await fs.readFile('./productos.json');
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('Aún no hay archivo');
		}
    }
    //Método para escribir o sobreescribir
    async write() {
        await fs.writeFile('./productos.json', JSON.stringify(this.content));
    }
    //Método para guardar producto
    save(product) {
        this.countID++;
        product["id"] = this.countID;
        this.content.push(product);
        this.write();
        return `El id del objeto añadido es ${this.countID}`;
    }
    //Método para devolver todos los productos existentes
    getAll() {
        return this.content;
    }
    //Método para mostrar un producto según el ID
    getById(id) {
        let result;
        if (this.content !== []) {
            result = this.content.find(x => x.id === id)
            if (result === undefined) {
                result = null;
            }
        } else {
            result = 'El archivo está vacío';
        }
        return result;
    }
    //Método para eliminar producto según el ID
    deleteById(id) {
        let result;
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent;
            this.write();
            result = `El producto ${id} fue eliminado`;
        } else {
            result = `El archivo está vacío`;
        }
        return result;
    }
    //Método para actualizar un producto según ID
    update(id, obj){
        const index = this.content.findIndex(obj => obj.id == id);
        obj.id = this[index].id;
        this.content[index] = obj;
        return obj;
    }
}

module.exports = Contenedor