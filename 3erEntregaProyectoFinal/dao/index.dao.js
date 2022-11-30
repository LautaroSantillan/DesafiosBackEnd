const { connectionMongoDB } = require('../config/connectionMongoDB.js')
const ProductosDaoMongoDB  = require('./products/ProductosDaoMongoDB.js')
const CartsDaoMongoDB = require('./carts/CartsDaoMongoDB.js')
const UsersDaoMongoDB = require('./users/UsersDaoMongoDB.js')
const dotenv = require('dotenv').config()

const DAO = process.env.DAO

let productsDao
let cartsDao
let usersDao

switch (DAO) {
    case 'mongoDB':

        connectionMongoDB()
        productsDao = new ProductosDaoMongoDB()
        cartsDao = new CartsDaoMongoDB()
        usersDao = new UsersDaoMongoDB()

        break;
        
    default:
        break;
}

module.exports = { productsDao, cartsDao, usersDao }