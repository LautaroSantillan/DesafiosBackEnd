import fs from 'fs';
import { products } from './controllerProduct.js';

class Container {
    constructor(fileName) {
        this.fileName = fileName;
        this.objects = this.readData();
    }
    //Generar ID
    generateId() {
        try {
            if (this.objects.length === 0) {
                return 1;
            } else {
                return this.objects[this.objects.length - 1].id + 1;
            }
        } catch (err) {
            console.log(err);
        }
    };
    //Guardar un objeto
    async save(obj) {
        try {
            obj.id = await this.generateId();
            obj.timestamp = Date.now();
            this.objects.push(obj);
            this.writeData();
            return `El id del objeto añadido es ${obj.id}`;
        } catch (err) {
            console.log(err);
        }
    };
    //Devuelve un objeto segun el ID
    getById(id) {
        try {
            const obj = this.objects.find(o => o.id === id);
            return obj ? obj : null;
        } catch (err) {
            console.log(err);
        }
    };
    //Devuelve un array con los objetos presentes en el archivo
    getAll() {
        try {
            return this.objects;
        } catch {
            return [];
        }
    };
    //Elimina un objeto segun el ID 
    deleteById(id) {
        try {
            let indexObj = this.objects.findIndex(obj => obj.id === id);
            if (indexObj === -1) {
                return indexObj;
            } else {
                this.objects.splice(indexObj, 1);
                this.writeData();
            }
        } catch (err) {
            console.log(err);
        }
    };
    //Elimina todos los objetos guardados
    async deleteAll() {
        try {
            this.objects = [];
            this.writeData();
        } catch (err) {
            console.log(err);
        }
    };
    //Actualiza un objeto segun el ID
    update(id, data) {
        const objToUpdate = this.getById(id);
        const indexObj = this.objects.findIndex(obj => obj.id === objToUpdate.id);
        this.objects[indexObj] = { ...this.objects[indexObj], ...data };
        this.writeData();
    };
    //Lee el archivo
    readData() {
        try {
            return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        } catch (error) {
            console.log(error);
            if (error.message.includes('No se encontró el archivo o directorio')) return [];
        }
    };
    //Escribe el archivo
    async writeData() {
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.objects, null, 2));
    };
    //Guarda un objeto = producto
    saveProduct(idCartSelected, idProduct) {
        try {
            const cartSelected = this.getById(idCartSelected);
            if (cartSelected == null) {
                return null;
            } else {
                const productSelected = products.getById(idProduct);
                if (productSelected == null) {
                    return null;
                } else {
                    cartSelected.products.push(productSelected);
                    this.writeData();
                    return 'Producto agregado!';
                }
            };
        } catch (err) {
            console.log(err);
        }
    };
    //Elimina un objeto = producto  
    deleteProduct(idCartSelected, idProduct) {
        try {
            const cartSelected = this.getById(idCartSelected);
            if (cartSelected == null) {
                return null;
            } else {
                const productToDelete = cartSelected.products.findIndex(product => product.id === idProduct);
                if (productToDelete == -1) {
                    return null;
                } else {
                    cartSelected.products.splice(productToDelete, 1);
                    this.writeData();
                    return 'Producto eliminado!';
                }
            };
        } catch (error) {
            console.log(error);
        }
    };
};

export default Container;