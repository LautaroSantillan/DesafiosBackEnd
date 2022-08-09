const express = require('express');
const Contenedor = require('./src/main.js');
const app = express();
const PORT = 8080;
const productos = new Contenedor();

const products = [
    {
        "id": 1,
        "title": "Coca-Cola",
        "price": 180,
        "thumbnail": "https://www.cocacola.es/content/dam/one/es/es2/coca-cola/products/productos/dic-2021/CC_Origal.jpg"
    },
    {
        "id": 2,
        "title": "Pepsi",
        "price": 150,
        "thumbnail": "https://www.boulevard-sa.com.ar/Site/img/products/pepsi/Pepsi-350-V-L.jpg"
    },
    {
        "id": 3,
        "title": "Manaos",
        "price": 120,
        "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_716200-MLA43739181284_102020-O.jpg"
    }
]

app.get('/productos', (req, res) => {
    res.status(202).send('<h1>Estas en /productos</h1></br><p>Aqui se retornaran todos los productos</p>');
    //res.send(console.log(products));
    //res.send(main());
    //res.send(productos.getAll());
    main();
})

app.get('/productoRandom', (req, res) => {
    res.status(202).send("Estas en /productos");
    res.send('Pagina de inicio /');
})

app.get('*', (req, res) => {
    res.send('<h1 style="color: red;">ERROR 404 - PAGE NOT FOUND</h1>');
})

const server = app.listen(PORT, () => {
    console.log(`El servidor HTTP se esta escuchando correctamente en http://localhost:${PORT}/`);
})

async function main(){
    console.log(await productos.getAll());
}