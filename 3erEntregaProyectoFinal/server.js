/* --------------------------- Modulos ----------------------------*/
const express = require('express');
const session = require('express-session');
const mongoSessions = require('./config/mongoSessions.js');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const hbs = require('hbs');
const puerto = require('./config/puerto');
const modoServer = require('./config/modoServer');
const logger = require('./utils/logger');
const { Server: HttpServer } = require('http');
const { Server: IOSocket } = require('socket.io');
const productos = require('./sockets/productos.socket.js');
const carrito = require('./sockets/cart.socket.js');

/* --------- Instancia Server ----------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOSocket(httpServer);

/* ------------- Motores de Plantillas ------------------ */
app.set('view engine', 'hbs');
app.set('views', (__dirname + '/public/views'));
hbs.registerPartials(__dirname + '/public/views/partials')

/* ---------------------- Use ----------------------- */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public')) 
app.use(express.static(__dirname + '/uploads'))
app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: false,
    saveUninitialized: false,
    rolling: true,                  
    cookie: {
        maxAge: 1000 * 60 * 10                     
    },
    store: mongoSessions
}))
app.use(morgan('dev'))

/* ------------------- Passport -------------------- */
const passport = require('./services/passport.js');
app.use(passport.initialize());
app.use(passport.session());

/* ------------------- Routes --------------------------- */
const login = require('./routes/login.routes.js');
const signup = require('./routes/signup.routes.js');
const home = require('./routes/home.routes.js');
const logout = require('./routes/logout.routes.js');
const admin = require('./routes/admin.routes.js');
const user = require('./routes/user.routes.js');
const cart = require('./routes/cart.routes.js');
app.use(login);
app.use(signup);
app.use(home);
app.use(logout);
app.use(admin);
app.use(user);
app.use(cart);

/* --------------------------------- Middlewares ------------------------------------*/
const pageNotFound = require('./middlewares/pageNotFound.middleware.js');
app.use(pageNotFound);
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(session(
    {
        secret: process.env.SESSION_SECRET || '123456',
        resave: false,
        saveUninitialized: false,
        rolling: true,                  
        cookie: {
            maxAge: 1000 * 60 * 10                     
        },
        store: mongoSessions
    }
)));

/* ------------- WebSocket ------------*/
io.on('connection', async (socket) =>{
    console.log('A user connected');
    productos(socket, io);
    carrito(socket, io);
    socket.emit ('mensaje-servidor');
});

/* ---------------------- Servidor ----------------------*/
const PORT = process.env.PORT 
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