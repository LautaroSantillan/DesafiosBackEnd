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
const puerto = require('./config/puerto');
const modoServer = require('./config/modoServer');

/* ------------------- Instancia Server -------------------*/
const app = express();
const httpServer = new HttpServer(app)
const io = new IOSocket(httpServer)

/* --------- Motores de Plantillas ------------ */
app.set('view engine', 'hbs');
app.set('views', (__dirname + '/public/views'));

/* ---------------------- Middlewares ----------------------*/
const pageNotFound = require('./middlewares/pageNotFound.middleware.js');
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

/* ----------------- Passport ------------------ */
const passport = require('./routes/passport.js');
app.use(passport.initialize());
app.use(passport.session());

/* ------------------- Routes --------------------------- */
const login = require('./routes/login.js');
const signup = require('./routes/signup.js');
const home = require('./routes/home.js');
const logout = require('./routes/logout.js');
const productosTest = require('./routes/productos-test.js');
const info = require('./routes/info.js');
const randoms = require('./routes/randoms.js');
const infoCompress = require('./routes/info-compress.js');
app.use(login);
app.use(signup);
app.use(home);
app.use(logout);
app.use(productosTest);
app.use(info);
app.use(randoms);
app.use(infoCompress);
app.use(pageNotFound);

/* ---------------------- WebSocket ----------------------*/
io.on('connection', async (socket) =>{
    console.log('Conexión establecida');
    productosTestSocket(socket, io);
    productos(socket,io);
    mensajes(socket,io);
    socket.emit ('mensaje-servidor');
});

/* ---------------------- Servidor ----------------------*/
const PORT = puerto;
const modo = modoServer;
const { fork } = require('child_process');
const os = require('os');
const CPUs = os.cpus();
const numCPUs = CPUs.length;
const cluster = require('cluster');

if(cluster.isPrimary && modo === 'cluster'){
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker, code, signal) =>{
        console.log(` Worker: ${worker.process.pid} start. Date: ${new Date().toLocaleDateString()}`);
    })
    cluster.on('exit', (worker, code, signal) =>{
        console.log(` Worker: ${worker.process.pid} died. Date: ${new Date().toLocaleDateString()}`);
    })
}else {
    httpServer.listen(PORT, (err) =>{
        if(err) throw new Error(`Error on server: ${err}`)
        console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/ - Process ID: ${process.pid}. Date: ${new Date().toLocaleDateString()}`)
    })
}