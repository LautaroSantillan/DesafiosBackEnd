/* ---------------------- Modulos ----------------------*/
const express = require('express');
const Contenedor = require('./class/contenedor');
const expHbs = require('express-handlebars');

/* ------------------- Instancia Server -------------------*/
const app = express();
const productos = new Contenedor(__dirname + '/DB/productos.json');

/* ---------------------- Middlewares ----------------------*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine('hbs', expHbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + './views/partials'
}))

/* ------------- Motor de Plantillas ---------------------- */
app.set('views', './views');
app.set('view engine', 'hbs');

/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res) => {
    let content = productos.content;
    return res.render('partials/index.hbs', {content});
})

app.post("/productos", (req, res) => {
    productos.save(req.body);
    let content = productos.content;
    let boolean = content.length !==0;
    return res.render('partials/productos.hbs', {list: content, showList: boolean});
});

app.get("/productos", (req, res) => {
    let content = productos.content;
    let boolean = content.length !==0;
    return res.render('partials/productos.hbs', {list: content, showList: boolean});
});

/* ---------------------- Servidor ----------------------*/
const PORT = 6060;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));
