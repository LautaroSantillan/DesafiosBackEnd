const express = require('express');
const multer = require('multer');
const routerProductos = express.Router();
const Container = require('./class.js');
const contenedor = new Container();

routerProductos.get('/', (req, res)=>{
    return res.status(200).json(contenedor.content);
});

routerProductos.get('/:id', (req, res)=>{
    let id = Number(req.params.id);
    res.status(200)(contenedor.getById(id));
});

routerProductos.post('/', (req, res)=>{
    let obj = req.body;
    res.status(201).json(contenedor.save(obj));
})

routerProductos.put("/:id", (req, res) => {
    let obj = req.body;
    let id = Number(req.params.id);
    res.status(200).json(contenedor.update(id, obj));
});

routerProductos.delete("/:id", (req, res) => {
    let id = Number(req.params.id);
    res.status(200).json(contenedor.deleteById(id));
});

module.exports = routerProductos;