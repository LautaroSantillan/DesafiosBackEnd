/* ---------------------- Modulos ----------------------*/
const express = require('express');
const morgan = require('morgan');
const Contenedor = require('./class/contenedor');

/* ------------------- Instancia Server -------------------*/
const app = express();
const productos = new Contenedor(__dirname + '/DB/productos.json');

/* ---------------------- Middlewares ----------------------*/
app.use(express.static('./public')) 
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

/* ------------- Motor de Plantillas ---------------------- */
app.set('views', './views/layouts');
app.set('view engine', 'ejs');

/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res) => {
    let content = productos.content;
    return res.render('index.ejs', {content});
})

app.post("/", (req, res) => {
    productos.save(req.body);
    let content = productos.content;
    return res.render('index.ejs', {content});
});

/* ---------------------- Servidor ----------------------*/
const PORT = 8888;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
});

const io = require('socket.io')(server);

server.on('error', error => console.log(`Error en servidor ${error}`));

/* ---------------------- WebSocket ----------------------*/
const messages = [
    {author: 'example@gmail.com', text: 'Bienvenido al server', datetime: '31/08/2022, 20:30:45'}
]

io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado! ${socket.id}`);
    socket.emit('from-server-messages', messages);

    socket.on('from-client-messages', (data) => {
        data.time = new Date().toLocaleString();
        messages.push(data);
        io.sockets.emit('from-server-messages', [data]);
    });
})