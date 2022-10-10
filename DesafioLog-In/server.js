/* ---------------------- Modulos ----------------------*/
const ContenedorProductos = require('./clases/contenedorProductos.js')
const ContenedorMensajes = require('./clases/contenedorMensajeArchivo.js')
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const dotenv = require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

/* ------------------- Instancia Server -------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* --------------- Session -------------------- */
const { MONGO_PASSWORD, MONGO_USER, MONGO_HOST } = process.env; 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/test`, mongoOptions: mongoConfig}),
    cookie: {  
        maxAge: 60000
    }
}));
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig})
})
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

/* -------------- Cokkie ---------------------- */
app.use(cookieParser(process.env.COOKIES_SECRET));

/* ---------------------- Middlewares ----------------------*/
const authMiddleware = require('./middleware/auth.middleware');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

/* ---------------- Mongo ---------------------- */
const MongoStore = require('connect-mongo');
const mongoConfig = {
    useNewUrlparser: true,
    useUnifiedTopology: true
};

/* -------------- Bases de Datos ----------------- */
const contenedorMensajes = new ContenedorMensajes('./mensajes.json');
const contenedorProductos = new ContenedorProductos('./productos.json');

/* ---------------------- Rutas ----------------------*/
// app.get('/', (req, res) =>{
//     res.sendFile('index.html', { root: __dirname} );
// })

app.get('/productos-test', (req,res) =>{
    res.sendFile('productos-test.html', { root: __dirname} );
})

app.get('/', authMiddleware, async (req, res) =>{
    try{
        res.sendFile('index.html', { root: __dirname} );
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    };
})

app.post('/', authMiddleware, async (req, res) =>{
    const logout = !req.body;
    try{
        if(!logout){
            const nameUser = req.session.userName;
            console.log(nameUser);
            res.status(200).redirect('/logout');
        };
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    };
})

app.get('/logout', async (req, res) =>{
    try{
        const logout = () => {
            req.session.destroy();
        };
        setTimeout(
            logout, 5000
        );
        res.sendFile('logout.html', { root: __dirname} );
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

app.get('/login', async (req, res) =>{
    try{
        const userName = req.session.userName;
        const userPassword = req.session.userPassword;
        if (userName && userPassword){
            req.session.userName = userName;
            req.session.userPassword = userPassword;
            return res.status(400).redirect('/');
        }else{
            return res.status(200).sendFile('login.html', { root: __dirname} );
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

app.post('/login', async (req, res) =>{
    try{
        const userName = req.body.userName;
        const userPassword = req.body.userPassword;
        if (userName && userPassword){
            req.session.userName = userName;
            req.session.userPassword = userPassword;
            return res.status(200).redirect('/');
        }else{
            return res.status(400).redirect('/login');
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

/* --------------------- Faker ---------------------- */
const { faker } = require('@faker-js/faker');
faker.locale = 'es';
faker.random = 'true';
let getProductoTest = async () =>{
    const productos = []
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

    let nameUser = socket.request.session.userName

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

    socket.emit('mensaje-servidor', productos, messages, compresion, nameUser);

    socket.on('message-nuevo', async (message, cb) =>{        
        await contenedorMensajes.save(message);
        const messages = await contenedorMensajes.getAll();
        io.sockets.emit('mensaje-servidor', productos, messages, compresion, nameUser);
    });

    socket.on('productos-test', () =>{        
        io.sockets.emit('mensaje-servidor-productosTest', productosTest);
    });
})

/* ---------------------- Servidor ----------------------*/
const PORT = process.env.PORT;
httpServer.listen(PORT, (err) =>{
    if(err) throw new Error(`Error on server: ${err}`);
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
})