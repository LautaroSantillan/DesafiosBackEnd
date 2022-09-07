/*--------------- Imports -------------------*/
import express from 'express';
import { addCart, deleteCart, getProducts, addProductToCart, deleteProduct } from '../Controllers/controllerCart.js';

/*-------- Variables -----------*/
const routerCarts = express.Router();

/*---------------- Router ---------------*/
//Añadir Carrito
routerCarts.post('/', (req, res) => addCart(req, res)); //Funciona

//Eliminar Carrito
routerCarts.delete('/:id', (req, res) => deleteCart(req, res)); //Funciona

//Obtener productos de un carrito especifico
routerCarts.get('/:id/productos', (req, res) => getProducts(req, res)); //Funciona

//Añadir producto a un carrito 
routerCarts.post('/:id/productos', (req, res) => addProductToCart(req, res)); //No funciona

//Eliminar producto de un carrito 
routerCarts.delete('/:id/productos/:id_prod', (req, res) => deleteProduct(req, res)); //No funciona

export default routerCarts;