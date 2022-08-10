const express = require('express');
const Contenedor = require('./contenedor');
const app = express();
const PORT = 8080;
const productos = new Contenedor();

app.get('/productos', async (req, res) => {
    const products = await productos.getAll();
    res.send(products);
});

app.get('/productoRandom', async (req, res) => {
    const product = await productos.getRandom();
    res.send(product);
});

app.get('*', (req, res) => {
    res.send('<h1 style="color: red;">ERROR 404 - PAGE NOT FOUND</h1>');
});

const server = app.listen(PORT, () => {
    console.log(`El servidor HTTP se esta escuchando correctamente en http://localhost:${PORT}/productos y en http://localhost:${PORT}/productoRandom`);
});