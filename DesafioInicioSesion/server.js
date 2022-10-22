/* --------------------------- Modulos ----------------------------*/
const express = require('express')
const session = require('express-session')
const mongoSessions = require('./config/mongoSessions.js');
const dotenv = require('dotenv').config();
const logger = require('morgan');
const { Server: HttpServer } = require('http');
const { Server: IOSocket } = require('socket.io');
const productosTestSocket = require('./sockets/productos-test.js');
const mensajes = require('./sockets/mensajes.js');
const productos = require('./sockets/productos.js');

/* ------------------- Instancia Server -------------------*/
const app = express();
const httpServer = new HttpServer(app)
const io = new IOSocket(httpServer)

/* --------- MOTORES DE PLANTILLAS ------------ */
app.set('view engine', 'hbs');
app.set('views', (__dirname + '/public/views'));

/* ---------------------- Middlewares ----------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,                  
    cookie: {
        maxAge: 1000 * 60 * 10                     
    },
    store: mongoSessions
}))
app.use(logger('dev'));

/* ----------------- PASSPORT ------------------ */
const passport = require('./routes/passport.js');
app.use(passport.initialize());
app.use(passport.session());

/* ------------------- ROUTES --------------------------- */
const login = require('./routes/login.js');
const signup = require('./routes/signup.js');
const home = require('./routes/home.js');
const logout = require('./routes/logout.js');
const productosTest = require('./routes/productos-test.js');
app.use(login);
app.use(signup);
app.use(home);
app.use(logout);
app.use(productosTest);

/* ---------------------- WebSocket ----------------------*/
io.on('connection', async (socket) =>{
    console.log('Conexión establecida');
    productosTestSocket(socket, io);
    productos(socket,io);
    mensajes(socket,io);
    socket.emit ('mensaje-servidor');
});

/* ---------------------- Servidor ----------------------*/
const PORT = process.env.PORT;
httpServer.listen(PORT, (err) =>{
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
})