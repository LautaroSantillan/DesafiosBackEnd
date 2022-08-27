const fs = require('fs/promises');

class Contenedor {
    constructor(name) {
        this.fileName = name;
        this.countID = 0;
        this.content = [];
        this.init();
    }
    //Método para inicializar el archivo
    async init() {
        try {
			let data = await fs.readFile(this.fileName);
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('Aún no hay archivo');
		}
    }
    //Método que escribe/sobreescribe
    async write() {
        await fs.writeFile(this.fileName, JSON.stringify(this.content));
    }
    //Método para guardar un producto
    save(object) {
        this.countID++; 
        object["id"] = this.countID; 
        this.content.push(object); 
        this.write(); 
        return `El id del objeto añadido es ${this.countID}`; 
    }
    //Método para obtener todos los productos
    getAll() {
        return this.content;
    }
    //Método para obtener un producto según ID
    getById(id) {
        let result;
        if (this.content !== []) {
            result = this.content.find(x => x.id === id);
            if (result === undefined) {
                result = null;
            }
        } else {
            result = 'El archivo está vacío';
        }
        return result;
    }
    //Método para eliminar un producto según ID
    deleteById(id) { 
        let result;
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id);
            this.content = newContent;
            this.write();
            result = `El producto ${id} fue eliminado`;
        } else {
            result = `El archivo está vacío`;
        }
        return result;
    }
    //Método para actualizar productos
    update(id, obj){
        const index = this.content.findIndex(objT => objT.id == id);
        obj.id = this.content[index].id;
        this.content[index] = obj;
        return obj;
    }
}

module.exports = Contenedor;