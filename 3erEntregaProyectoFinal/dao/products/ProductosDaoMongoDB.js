const  ProductosMongoDB = require('../../classes/products/ContainerProductosMongoDB.js')
const productsSchema = require('../../models/products.model.js')

class ProductosDaoMongoDB extends ProductosMongoDB {
    constructor(){
        super('productos', productsSchema)
    }
}

module.exports = ProductosDaoMongoDB