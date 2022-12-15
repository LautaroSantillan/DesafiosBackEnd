const { faker } = require('@faker-js/faker');
faker.locale = 'es'
faker.random = 'true'

let getProductoTest = async () =>{
    const productos = []
    for (let i=0; i < 10 ; i++){
        const id = productos.length + 1
        const title = faker.commerce.productName()
        const price = faker.commerce.price()
        const thumbnail = faker.image.imageUrl()
        const producto = {id,title,price,thumbnail}
        productos.push(producto)
    }  
    return productos
}

const productosTestSocket = async (socket, io) => {

    const productosTest = await getProductoTest()
    socket.on('productos-test', () =>{        
        io.sockets.emit('mensaje-servidor-productosTest', productosTest)
    })

}

module.exports = productosTestSocket