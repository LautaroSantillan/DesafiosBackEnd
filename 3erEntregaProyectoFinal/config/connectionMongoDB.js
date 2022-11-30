const dotenv = require('dotenv').config()
const logger = require('../utils/logger');
/* --- datos para la config MongoDB Atlas */
const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST} = process.env
/* ------ configuración conección ------ */
const mongoConfig = {
    useNewUrlparser: true,
    useUnifiedTopology: true
}
/* ------ configuración url ------ */
const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`
/* ------ configuración coneccion ------ */
const connectionMongoDB = async () =>{
    const connectMongoDB = async () =>{
        try {
            mongoose.connect( mongoUrl, mongoConfig )
            logger.info('MongoDB connected');
    
        } catch (error) {
            logger.error(error);
        }
    }
    connectMongoDB()
}
/* ------ exports ------ */
module.exports = {mongoUrl, mongoConfig , connectionMongoDB}