import express from 'express';
import { addCart, deleteCart, getProducts, addProductToCart, deleteProduct } from '../Controllers/controllerCart.js';
const routerCarts = express.Router();

//Añadir Carrito
routerCarts.post('/', (req, res) => addCart(req, res));

//Eliminar Carrito
routerCarts.delete('/:id', (req, res) => deleteCart(req, res));

//Obtener productos de un carrito especifico
routerCarts.get('/:id/products', (req, res) => getProducts(req, res));

//Añadir producto a un carrito 
routerCarts.post('/:id/products', (req, res) => addProductToCart(req, res));

//Eliminar producto de un carrito 
routerCarts.delete('/:id/products/:id_prod', (req, res) => deleteProduct(req, res));

export default routerCarts;