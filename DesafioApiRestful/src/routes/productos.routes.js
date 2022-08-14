const express = require('express');
const multer = require('multer');
const routerProductos = express.Router();

/*DB*/
const DB_PRODUCTOS = [];

/*Middlewares*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname }`)
    }
});
const upload = multer({storage: storage});

routerProductos.get('/', (req, res)=>{
    res.status(200).json(DB_PRODUCTOS);
});

routerProductos.get('/:id', (req, res)=>{
    res.status(200).json({msg:'Te da la patita!'});
});

routerProductos.post('/', upload.single('thumbnail'), (req, res, next)=>{
    if (!req.file) {
        const err = new Error('Por favor agregar archivo');
        return next(err);
    } else {
        console.log(req.body);
        DB_PRODUCTOS.push(req.body);
        res.status(201).json({msg: 'Producto agregado exitosamente!', data: req.body});
    }
});

module.exports = routerProductos;