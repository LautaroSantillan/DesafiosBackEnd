/* ---------------------- Modulos ----------------------*/
const express = require('express');
const path = require('path');
const Contenedor = require('./class/contenedor');

/* ------------------- Instancia Server -------------------*/
const app = express();
const productos = new Contenedor(__dirname + '/DB/productos.json');

/* ---------------------- Middlewares ----------------------*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* ------------- Motor de Plantillas ---------------------- */
app.set('views', './views/partials');
app.set('view engine', 'ejs');

/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res) => {
    let content = productos.content;
    return res.render('index.ejs', {content});
})

app.post("/productos", (req, res) => {
    productos.save(req.body);
    let content = productos.content;
    return res.render('productos.ejs', {content});
});

app.get("/productos", (req, res) => {
    let content = productos.content;
    return res.render('productos.ejs', {content});
});

/* ---------------------- Servidor ----------------------*/
const PORT = 4040;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));
