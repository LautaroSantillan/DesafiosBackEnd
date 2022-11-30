const { productsDao, cartsDao } = require("../dao/index.dao");
const { sendEmailNewOrder } = require("../services/nodeMailer");
const { sendNewOrder, sendWhatsApp, sendWhatsAppAdmin } = require("../services/twilio");
const logger = require("../utils/logger");

const sumar = (arr) => {
    let total = 0
    for(let i = 0; i <= arr.length -1 ; i++){
        total +=arr[i]
    }
    return total
}

const carrito = async (socket, io ) => {
    try {
        let user = socket.request.session.passport.user
        const getCarrito = await cartsDao.getByEmail(user.userEmail)
        let carrito = getCarrito
        if(carrito){
            const carrito = getCarrito
            let arr = carrito.productos.map( prod => prod.price) 
            let total = sumar(arr)
            socket.emit('mensaje-servidor-carrito', carrito, total)
        }else{
            const carrito = await cartsDao.crearCarrito(user.userEmail)
            socket.emit('mensaje-servidor-carrito', carrito)
        }
        socket.on('agregar-producto', async (productId) => {
            let user = socket.request.session.passport.user           
            let email = user.userEmail
            const carrito = await cartsDao.getByEmail(email)
            if(carrito){
                io.sockets.emit('mensaje-servidor-carrito', carrito)
            }else{
                io.sockets.emit('mensaje-servidor-carrito', carrito)
            }
        })

        socket.on('eliminar-producto', async (productId) => {
            let user = socket.request.session.passport.user
            let email = user.userEmail
            //const carrito = await cartsDao.getByEmail(email)
            if(carrito){
                //await cartsDao.deleteProductInCart(email, productId)                
                io.sockets.emit('mensaje-servidor-carrito', carrito)
            }else{
                io.sockets.emit('mensaje-servidor-carrito', carrito)
            }
        })

        socket.on('vaciar-producto', async (productId) => {
            let user = socket.request.session.passport.user
            let email = user.userEmail
            const carrito = await cartsDao.getByEmail(email)
            if(carrito){
                await carrito.updateOne({ $set: { productos: [] } })                
                io.sockets.emit('mensaje-servidor-carrito', carrito)
            }else{
                io.sockets.emit('mensaje-servidor-carrito', carrito)
            }
        })

        socket.on('comprar-carrito', async () => {
            let user = socket.request.session.passport.user
            const carrito = await cartsDao.getByEmail(user.userEmail)
            if(carrito){
                //let order = JSON.stringify(carrito.productos)
                //let order = carrito.productos
                let precios = carrito.productos.map( prod => prod.price)
                let total = sumar(precios)
                let order = carrito.productos.map( prod => {
                    return `
                        Producto: ${prod.title}
                        Precio: $${prod.price}
                    `
                }) 
                await sendWhatsAppAdmin(order, total, user) // ---> Este envía a ADMIN por whatsapp la Orden ya que no deja enviar SMS a msj sin verificar
                await sendWhatsApp(order, total , user) // ---> Este envía whatsapp a usuario su orden
                await sendEmailNewOrder(order, total, user) // ---> Este envía correo a usuario su orden
                await carrito.updateOne({ $set: { productos: [] } })
                io.sockets.emit('mensaje-servidor-carrito', carrito)
            }
        })

    } catch (error) {
        logger.error('Error en cart.socket', error)
    }
}

module.exports = carrito