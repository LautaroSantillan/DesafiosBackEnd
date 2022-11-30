const CartsMongoDB = require('../../classes/carts/ContainerCartsMongoDB')
const cartsSchema = require('../../models/carts.model')

class CartsDaoMongoDB extends CartsMongoDB {
    constructor(){
        super('carritos', cartsSchema)
    }
}

module.exports = CartsDaoMongoDB