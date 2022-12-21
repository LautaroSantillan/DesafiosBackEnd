/* ------------------------------- Modulos --------------------------------*/
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const productosTestSocket = require('./sockets/productos-test.sockets.js');
const mensajes = require('./sockets/mensajes.sockets.js');
const productos = require('./sockets/productos.sockets.js');
const mongoSessions = require('./config/mongoSessions.js');
const { Server: HttpServer } = require('http');
const { Server: IOSocket } = require('socket.io');
const puerto = require('./config/puerto');
const modoServer = require('./config/modoServer');
const cors = require('cors');

/* ----------- Instancia Server ----------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOSocket(httpServer);

/* --------- Motores de Plantillas ------------ */
app.set('view engine', 'hbs');
app.set('views', (__dirname + '/public/views'));

/* ---------------------- Middlewares ----------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')) // ---> NGINX
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,                  
    cookie: {
        maxAge: 1000 * 60 * 10                     
    },
    store: mongoSessions
}));
app.use(morgan('dev'));
app.use(cors());

/* ----------------- Passport ------------------ */
const passport = require('./services/passport.js');
app.use(passport.initialize());
app.use(passport.session());

/* ------------------- Routes --------------------- */
const routes = require('./routes/index.routes.js');
const login = require('./routes/login.routes.js');
const signup = require('./routes/signup.routes.js');
const home = require('./routes/home.routes.js');
const logout = require('./routes/logout.routes.js');
const productosTest = require('./routes/productos-test.routes.js');
const info = require('./routes/info.routes.js');
const randoms = require('./routes/randoms.routes.js');
app.use(routes);
app.use(login);
app.use(signup);
app.use(home);
app.use(logout);
app.use(productosTest);
app.use(info);
app.use(randoms);

/* ---------------------- WebSocket ----------------------*/
io.on('connection', async (socket) =>{
    console.log('A user connected');
    productosTestSocket(socket, io);
    productos(socket, io);
    mensajes(socket, io);
    socket.emit ('mensaje-servidor');
});

/* ---------------------- Servidor (FORKS) ----------------------*/
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
    };
    cluster.on('online', (worker, code, signal) =>{
        console.log(` Worker: ${worker.process.pid} start. Date: ${new Date().toLocaleDateString()}`);
    });
    cluster.on('exit', (worker, code, signal) =>{
        console.log(` Worker: ${worker.process.pid} died. Date: ${new Date().toLocaleDateString()}`);
    });
    }else {
        httpServer.listen(PORT, (err) =>{
            if(err) throw new Error(`Error on server: ${err}`)
            console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/ - Process ID: ${process.pid}. Date: ${new Date().toLocaleDateString()}`)
    });
};