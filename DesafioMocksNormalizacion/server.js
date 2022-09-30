/* ---------------------- Modulos ----------------------*/
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const randomData = require('./src/faker');

/* ------------------- Instancia Server -------------------*/
const app = express();
const httpserver = new HttpServer(app);

/* ---------------------- Middlewares ----------------------*/
app.use(express.static('views'));
app.engine('handlebars', engine());

/* ------------- Motor de Plantillas ---------------------- */
app.set('views', './views');
app.set('view engine', 'handlebars');

/* ---------------------- Rutas ----------------------*/
app.get('/api/products-test', (req, res) => {
    res.render('table');
});

/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = httpserver.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const io = new IOServer(httpserver);

server.on('error', () => console.log(`Error: ${err}`));

/* ---------------------- WebSocket ----------------------*/

io.on('connection', async socket => {
    console.log('Conexión establecida');
    const data = randomData();
    io.sockets.emit('products', data);
    socket.on('product', async data => {
        io.sockets.emit('products', data);
    })
});
