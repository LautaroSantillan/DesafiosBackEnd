const express = require('express');
const routerProductos = express.Router();
const Container = require('./Class/contenedor');
const productos = new Container('./DB/productos.json');

routerProductos.get('/', (req, res)=>{
    return res.json(productos.content);
});

routerProductos.get('/:id', (req, res)=>{
    let id = Number(req.params.id);
    return res.json(productos.getById(id));
});

routerProductos.post('/', (req, res)=>{
    let obj = req.body;
    return res.json(productos.save(obj));
})

routerProductos.put("/:id", (req, res) => {
    let obj = req.body;
    let id = Number(req.params.id);
    return res.json(productos.update(id, obj));
});

routerProductos.delete("/:id", (req, res) => {
    let id = Number(req.params.id);
    return res.json(productos.deleteById(id));
});

module.exports = routerProductos;