/* ---------------------- Modulos ----------------------*/
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const Container = require('./src/controller/container.js');
const { optionsMariaDB, optionsSQLite3 } = require('./src/options/config.js');

/* ---------------- Base de Datos ------------------- */ 
const messages = new Container(optionsMariaDB, 'messages');
const products = new Container(optionsSQLite3, 'products');

/* ------------------- Instancia Server -------------------*/
const app = express();

/* ---------------------- Middlewares ----------------------*/
app.use(express.static('./src/views')) 
app.use(express.json());
app.use(morgan('dev'));
app.engine('handlebars', engine());
app.use(express.urlencoded({extended: true}));

/* ------------- Motor de Plantillas ---------------------- */
app.set('views', './src/views');
app.set('view engine', 'handlebars');

/* ---------------------- Rutas ----------------------*/
app.get('/', async (req, res) => {
    res.render('form');
})

/* ---------------------- Servidor ----------------------*/
const PORT = 8888;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
});

const io = require('socket.io')(server);

server.on('error', error => console.log(`Error en servidor ${error}`));

/* ---------------------- WebSocket ----------------------*/

io.on('connection', async socket => {
    console.log('Conexión establecida');
    const dbProducts = await products.getAll();
    io.sockets.emit('products', dbProducts);
    const dbMessages = await messages.getAll();
    io.sockets.emit('messages', dbMessages);
    socket.on('product', async product => {
        products.save(product);
        const dbProducts = await products.getAll();
        io.sockets.emit('products', dbProducts);
    })
    socket.on('message', async message => {
        messages.save(message);
        const dbMessages = await messages.getAll();
        io.sockets.emit('messages', dbMessages);
    })
});

//npm i express && npm i morgan && npm i socket.io && npm i express-handlebars && npm i knex && npm i mysql && npm i sqlite 3 && nodemon server