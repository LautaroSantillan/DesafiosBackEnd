const express = require("express");
const { cartsDao, productsDao } = require("../dao/index.dao");
const { Router } = express;
const router = Router();
const logger = require("../utils/logger");
/* ---------  ------------- */
router.get('/cart', async (req,res) =>{    
    try{
        logger.info('GET /cart' )
        let user = req.user
        res.status(200).render('cart', {user})
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})
router.post('/cart', async (req,res) =>{    
    try{
        logger.info('POST /cart' )
        let user = req.user
        let {productId} = req.body
        let email = user.userEmail
        const producto = await productsDao.getById(productId)
        const carrito = await cartsDao.getByEmail(email)
        if(producto && carrito){
            const nuevoCarrito = await cartsDao.pushProduct(email, producto)
        }else{
            await cartsDao.crearCarrito(email)
            await cartsDao.pushProduct(email, producto)
        }
        res.status(200).render('cart', {user})
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})
router.get('/cart/:id', async (req,res) =>{    
    try{
        logger.info('GET /cart/:id' )
        let user = req.user
        let email = user.userEmail
        const { id } = req.params
        const carrito = await cartsDao.getByEmail(email)
        if(carrito){
            await cartsDao.deleteProductInCart(email, id)
            await cartsDao.getByEmail(email)            
        }
        res.status(200).render('cart', {user, carrito})
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})


module.exports = router;