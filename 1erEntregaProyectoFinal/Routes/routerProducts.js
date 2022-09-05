/*--------------- Imports -------------------*/
import express from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../Controllers/controllerProduct.js';

/*-------- Variables -----------*/
const routerProducts = express.Router();
let admin = true;
let usuario = true;

/*---------------- Router ---------------*/
//Obtiene todos los productos || producto seleccionado
routerProducts.get('/:id?', (req, res) => {
    if(admin === true || usuario === true) {
        getProducts(req, res); 
    }}
);

//Añade un producto
routerProducts.post('/', (req, res) => {
    const path = req.path;
    const method = req.method;
    if(admin === true ) {
        addProduct(req, res); 
    } else {
        return res.status(404).send({ error: -1 , descripción: `Ruta ${path} Metodo ${method} no autorizada`});
    }}
);

//Actualiza un producto
routerProducts.put('/:id', (req, res) => {
    const path = req.path;
    const method = req.method;
    if(admin === true ) {
        updateProduct(req, res); 
    } else {
        return res.status(404).send({ error: -1 , descripción: `Ruta ${path} Metodo ${method} no autorizada`});
    }}
);

//Elimina un producto
routerProducts.delete('/:id', (req, res) => {
    const path = req.path;
    const method = req.method;
    if(admin === true) {
        deleteProduct(req, res); 
    } else {
        return res.status(404).send({ error: -1 , descripción: `Ruta ${path} Metodo ${method} no autorizada`});
    }}
);

export default routerProducts; //Funcionando todos y también los errores (RapidAPI)