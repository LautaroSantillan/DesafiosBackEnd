import express from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../Controllers/controllerProduct.js';
const routerProducts = express.Router();

//Obtiene todos los productos || producto seleccionado
routerProducts.get('/:id?', (req, res) => getProducts(req, res));

//Añade un producto
routerProducts.post('/', (req, res) => addProduct(req, res));

//Actualiza un producto
routerProducts.put('/:id', (req, res) => updateProduct(req, res));

//Elimina un producto
routerProducts.delete('/:id', (req, res) => deleteProduct(req, res));

export default routerProducts;