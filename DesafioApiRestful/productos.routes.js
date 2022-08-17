const express = require('express');
const multer = require('multer');
const routerProductos = express.Router();
const Container = require('./class.js');
const contenedor = new Container();

routerProductos.get('/', async(req, res)=>{
    return res.json(await contenedor.getAll());
});

routerProductos.get('/:id', async(req, res)=>{
    let id = Number(req.params.id);
    res.json(await contenedor.getById(id));
});

routerProductos.post('/', async (req, res)=>{
    let obj = req.body;
    res.json(await contenedor.save(obj));
})

routerProductos.put("/:id", async(req, res) => {
    let obj = req.body;
    let id = Number(req.params.id);
    res.json(await contenedor.update(id, obj));
});

routerProductos.delete("/:id", async(req, res) => {
    let id = Number(req.params.id);
    res.json(await contenedor.deleteById(id));
});

module.exports = routerProductos;