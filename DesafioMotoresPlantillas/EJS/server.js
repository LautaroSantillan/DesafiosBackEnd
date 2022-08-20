/* ---------------------- Modulos ----------------------*/
const express = require('express');
const path = require('path');
const Contenedor = require('./class/contenedor');

/* ------------------- Instancia Server -------------------*/
const app = express();
const productos = new Contenedor(__dirname + './DB/productos.json');

/* ---------------------- Middlewares ----------------------*/
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* ------------- Motor de Plantillas ---------------------- */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res) => {
    let content = productos.content;
    return res.render('vista.ejs', {content})
})

app.post("/", (req, res) => {
    productos.save(req.body);
    let content = productos.content;
    return res.render('historial.ejs', {content});
});

/* ---------------------- Servidor ----------------------*/
const PORT = 4040;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));
