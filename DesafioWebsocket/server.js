/* ---------------------- Modulos ----------------------*/
const express = require('express');
const morgan = require('morgan');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require('./class/contenedor');

/* ------------------- Instancia Server -------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const productos = new Contenedor(__dirname + '/DB/productos.json');

/* ---------------------- Middlewares ----------------------*/
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
const PORT = 4040;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));

/* ---------------------- WebSocket ----------------------*/
io.on('connection', (socket)=>{
    console.log(`Nuevo cliente conectado! ${socket.id}`);
    socket.emit('from-server-messages', messages);

    socket.on("new-message", (data) => {
        data.time = new Date().toLocaleString();
        messages.push(data);
        io.sockets.emit("messages", [data]);
    });
})