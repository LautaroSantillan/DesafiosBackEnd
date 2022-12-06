const ContenedorProductos = require('../clases/contenedorProductos.js')
const contenedorProductos = new ContenedorProductos('./productos.json')

const productos = async ( socket, io ) =>{

    let getProductos = await contenedorProductos.getAll()
    const productos =  getProductos 

    socket.emit('mensaje-servidor-productos', productos)

    socket.on('producto-nuevo', async (producto) =>{
        await contenedorProductos.save(producto)
        const productos = await contenedorProductos.getAll()

        io.sockets.emit('mensaje-servidor-productos', productos)
        
    })
}

module.exports = productos