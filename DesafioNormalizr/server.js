/* ---------------------- Modulos ----------------------*/
const express = require('express');
const ContenedorProductos = require('./class/contenedorProductos');
const ContenedorMensajes = require('./class/contenedorMensajeArchivo');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

/* ------------------- Instancia Server -------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* -------------- Bases de Datos ----------------- */
const contenedorMensajes = new ContenedorMensajes('./databases/mensajes.json');
const contenedorProductos = new ContenedorProductos('./databases/ecommerce.sqlite');

/* ---------------------- Middlewares ----------------------*/
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res) =>{
    res.sendFile('index.html', { root: __dirname} );
})

app.get('/productos-test', (req,res) =>{
    res.sendFile('productos-test.html', { root: __dirname} );
})

/* ------------------- Faker -------------------- */
const { faker } = require('@faker-js/faker');
faker.locale = 'es';
faker.random = 'true';

let getProductoTest = async () =>{
    const productos = [];
    for (let i=0; i < 5 ; i++){
        const id = productos.length + 1;
        const title = faker.commerce.productName();
        const price = faker.commerce.price();
        const thumbnail = faker.image.imageUrl();
        const producto = {id,title,price,thumbnail};
        productos.push(producto);
    }
    return productos;
}

/* ------------------ Normalizr ---------------- */
const normalizr  = require('normalizr');
const { normalize, schema, denormalize } = normalizr;

const util = require('util');
const print = (obj) =>{
    console.log(util.inspect(obj, false, 12, true));
}

/* ---------------------- WebSocket ----------------------*/
io.on('connection', async (socket) =>{
    console.log('Conexión establecida');

    let getProductos = await contenedorProductos.getAll();
    const productos =  getProductos ;
    const productosTest = await getProductoTest();

    let getMensajes = await contenedorMensajes.getAll();
    const messages = getMensajes;
    let pesoOriginal = JSON.stringify(messages).length;
    
    console.log(`El tamaño original del archivo era de: `, pesoOriginal);
    
    const idSchema = new schema.Entity('id');
    const authorSchema = new schema.Entity('author');
    const textSchema = new schema.Entity('text');
    const mensajeSchema = new schema.Entity('messages', {
        id: idSchema,
        author: authorSchema,
        text: textSchema
    });

    const normalizedMensajes = normalize(messages, [mensajeSchema]);

    console.log( `Luego el tamaño del archivo quedó en: `, JSON.stringify(normalizedMensajes).length);

    let pesoComprimido = JSON.stringify(normalizedMensajes).length;

    const compresion = ((pesoComprimido * 100) / pesoOriginal).toFixed(2);

    console.log(`El porcentaje de compresión ha sido del: ${compresion} %`);

    socket.emit('mensaje-servidor', productos, messages, compresion);

    socket.on('message-nuevo', async (message, cb) =>{        
        await contenedorMensajes.save(message);
        const messages = await contenedorMensajes.getAll();
        io.sockets.emit('mensaje-servidor', productos, messages);
    });

    socket.on('productos-test', () =>{        
        io.sockets.emit('mensaje-servidor-productosTest', productosTest);
    });
})

/* ---------------------- Servidor ----------------------*/
const PORT = process.env.PORT || 3030
httpServer.listen(PORT, (err) =>{
    if(err) throw new Error(`Error on server: ${err}`);
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
})


