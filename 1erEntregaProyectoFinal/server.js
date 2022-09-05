/* ---------------------- Modulos ----------------------*/
import express from 'express';
import morgan from 'morgan';
import routerProducts from './routes/routerProducts.js';
import routerCart from './routes/routerCart.js';

/* ------------------- Instancia Server -------------------*/
const app = express();

/* ---------------------- Middlewares ----------------------*/
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

/* -------------------- Routes --------------------*/
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);
app.use('*', (req, res) => {
    const path = req.params;
    const method = req.method;
    res.send({ error: -2, descripción: `Ruta ${path} Metodo ${method} no implementada`})
})

/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));