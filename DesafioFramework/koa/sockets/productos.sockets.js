const { ProductosApi } = require("../api/index.api")
const productosApi = new ProductosApi()

const productos = async ( socket, io ) =>{

    let getProductos = await productosApi.getAll()
    const productos =  getProductos 

    socket.emit('mensaje-servidor-productos', productos)
    socket.on('producto-nuevo', async (producto) =>{
        await productosApi.save(producto)
        const productos = await productosApi.getAll()
        io.sockets.emit('mensaje-servidor-productos', productos)       
    })
}

module.exports = productos