const { productsDao } = require('../dao/index.dao.js')

const productos = async ( socket, io ) =>{

    let getProductos = await productsDao.getAll()
    const productos =  getProductos 
    socket.emit('mensaje-servidor-productos-home', productos)
    socket.emit('mensaje-servidor-productos-admin', productos)

    socket.on('producto-nuevo', async (producto) =>{
        await productsDao.save(producto)
        const productos = await productsDao.getAll()
        io.sockets.emit('mensaje-servidor-productos-admin', productos)
        io.sockets.emit('mensaje-servidor-productos-home', productos)
        
    })
}

module.exports = productos