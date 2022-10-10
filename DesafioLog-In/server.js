const ContenedorProductos = require('./clases/contenedorProductos.js')
const contenedorProductos = new ContenedorProductos('./productos.json')
const ContenedorMensajes = require('./clases/contenedorMensajeArchivo.js')
const contenedorMensajes = new ContenedorMensajes('./mensajes.json')
//require general
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const authMiddleware = require('./middleware/auth.middleware')
//require para session y cookie
const cookieParser = require('cookie-parser')
const session = require('express-session')
const logger = require('morgan')
const MongoStore = require('connect-mongo')
const mongoConfig = {
    useNewUrlparser: true,
    useUnifiedTopology: true
}
//config session
app.use(logger('dev'))
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST} = process.env
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig}),
    cookie: {
        maxAge: 60000
    }
}))

//config cookie
app.use(cookieParser(process.env.COOKIES_SECRET))

//config socket
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = process.env.PORT

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', authMiddleware , async (req, res) =>{
    try{
        res.sendFile('index.html', { root: __dirname} )
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
app.post('/', authMiddleware , async (req, res) =>{
    const logout = !req.body
    try{
        if(!logout){
            const nameUser = req.session.userName
            console.log(nameUser);
            res.status(200).redirect('/logout' )
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
app.get('/logout', async (req, res) =>{
    try{
        //req.session.destroy();
        const logout = () => {
            req.session.destroy()
        }
        setTimeout(
            logout, 5000
        )
        res.sendFile('logout.html', { root: __dirname} )
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.get('/login', async (req, res) =>{
    try{
        const userName = req.session.userName
        const userPassword = req.session.userPassword
        if (userName && userPassword){
            req.session.userName = userName;
            req.session.userPassword = userPassword;
            return res.status(400).redirect('/')
        }else{
            return res.status(200).sendFile('login.html', { root: __dirname} )
        }
        
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.post('/login', async (req, res) =>{
    try{
        const userName = req.body.userName
        const userPassword = req.body.userPassword
        if (userName && userPassword){
            req.session.userName = userName;
            req.session.userPassword = userPassword;
            return res.status(200).redirect('/')
        }else{
            return res.status(400).redirect('/login')
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

/* app.get('/', (req, res) =>{
    res.sendFile('index.html', { root: __dirname} )
}) */

app.get('/productos-test', (req,res) =>{
    res.sendFile('productos-test.html', { root: __dirname} )
})

//use faker para productos
const { faker } = require('@faker-js/faker');
faker.locale = 'es'
faker.random = 'true'
let getProductoTest = async () =>{
    const productos = []
    for (let i=0; i < 5 ; i++){
        const id = productos.length + 1
        const title = faker.commerce.productName()
        const price = faker.commerce.price()
        const thumbnail = faker.image.imageUrl()
        const producto = {id,title,price,thumbnail}
        productos.push(producto)
    }  
    return productos
}
// config normalizr
const normalizr  = require('normalizr')
const { normalize, schema, denormalize } = normalizr
const util = require('util')
const print = (obj) =>{
    console.log(util.inspect(obj, false, 12, true));
}
////////////////////////////
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig})
})
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
////////////////////////
//----------------------------------------------
io.on('connection', async (socket) =>{
    console.log('A user connected');

    let nameUser = socket.request.session.userName

    let getProductos = await contenedorProductos.getAll()
    const productos =  getProductos 
    const productosTest = await getProductoTest()

    let getMensajes = await contenedorMensajes.getAll()
    const messages = getMensajes
    let pesoOriginal = JSON.stringify(messages).length;
    
    console.log(`El tamaño original del archivo era de: `, pesoOriginal);
    
    const idSchema = new schema.Entity('id' );
    const authorSchema = new schema.Entity('author');
    const textSchema = new schema.Entity('text')
    const mensajeSchema = new schema.Entity('messages', {
        id: idSchema,
        author: authorSchema,
        text: textSchema
    })

    const normalizedMensajes = normalize(messages, [mensajeSchema])
    //print(normalizedMensajes)
    console.log( `Luego el tamaño del archivo quedó en: `, JSON.stringify(normalizedMensajes).length);    
    //const getNormalize = messages.map( msg => normalize(msg, mensajeSchema))
    const denormalizedMensajes = denormalize(normalizedMensajes, mensajeSchema, normalizedMensajes.entities)
    //print(denormalizedMensajes)
    //console.log(denormalizedMensajes);
    console.log(JSON.stringify(denormalizedMensajes).length);
    let pesoComprimido = JSON.stringify(normalizedMensajes).length;
    const compresion = ((pesoComprimido * 100) / pesoOriginal).toFixed(2)
    console.log(`El porcentaje de compresión ha sido del: ${compresion} %`);
    
    socket.emit('mensaje-servidor', productos, messages, compresion, nameUser)

    socket.on('producto-nuevo', async (producto, cb) =>{
        await contenedorProductos.save(producto)
        const productos = await contenedorProductos.getAll()
        const id = new Date().getTime()
        io.sockets.emit('mensaje-servidor', productos, messages, compresion, nameUser)
        cb(id)
    })
    socket.on('message-nuevo', async (message, cb) =>{        
        await contenedorMensajes.save(message)
        const messages = await contenedorMensajes.getAll()

        io.sockets.emit('mensaje-servidor', productos, messages, compresion, nameUser)
    })
    socket.on('productos-test', () =>{        
        io.sockets.emit('mensaje-servidor-productosTest', productosTest)
    })

})

httpServer.listen(PORT, (err) =>{
    if(err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is listenning en el puerto: ${PORT}`);
})

