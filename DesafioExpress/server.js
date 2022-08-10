const express = require("express");
const Contenedor = require("./contenedor");
const app = express();
const PORT = 8080;
const productos = new Contenedor();

app.get("/", async (req, res) => {
    res.send('<h1 style="color: blue; text-align: center">Servidor Inicializado</h1><br><h2>Vaya a http://localhost:8080/productos y http://localhost:8080/productoRandom para obtener los resultados</h2>');
});

app.get("/productos", async (req, res) => {
    const products = await productos.getAll();
    res.send(products);
});

app.get("/productoRandom", async (req, res) => {
    const product = await productos.getRandom();
    res.send(product);
});

app.get("*", (req, res) => {
    res.send('<h1 style="color: red;">ERROR 404 - PAGE NOT FOUND</h1>');
});

const server = app.listen(PORT, () => {
    console.log(`El servidor HTTP se esta escuchando correctamente en http://localhost:${PORT}/`);
});
