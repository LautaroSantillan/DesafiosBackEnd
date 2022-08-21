/* ---------------------- Modulos ----------------------*/
const express = require('express');
const Contenedor = require('./class/contenedor');

/* ------------------- Instancia Server -------------------*/
const app = express();
const productos = new Contenedor(__dirname + '/DB/productos.json');

/* ---------------------- Middlewares ----------------------*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* ------------- Motor de Plantillas ---------------------- */
app.set('views', './views');
app.set('view engine', 'pug');

/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res) => {
    let content = productos.content;
    return res.render('index.pug', {content});
})

app.post("/productos", (req, res) => {
    productos.save(req.body);
    let content = productos.content;
    return res.render('productos.pug', {content});
});

app.get("/productos", (req, res) => {
    let content = productos.content;
    return res.render('productos.pug', {content});
});

/* ---------------------- Servidor ----------------------*/
const PORT = 5050;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));
