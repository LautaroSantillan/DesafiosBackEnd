const MensajesFactory = require('../DAOs/mensajesFactory')
const ProductosFactory = require('../DAOs/productosFactory')
const dotenv = require('dotenv').config()

class MensajesApi {
    constructor(){
        this.mensajesDAO = MensajesFactory.get(process.env.DAO_MENSAJES) 
    }
    async save (obj) {
        return await this.mensajesDAO.save(obj)
    }
    async getAll() {
        return await this.mensajesDAO.getAll()
    }
}

class ProductosApi {
    constructor() {
        this.productosDAO = ProductosFactory.get(process.env.DAO_PRODUCTOS) 
    }
    async save (obj) {
        return await this.productosDAO.save(obj)
    }
    async getAll () {
        return await this.productosDAO.getAll()
    }
    
}

module.exports = { MensajesApi , ProductosApi }