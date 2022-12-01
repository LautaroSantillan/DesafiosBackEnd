/* --------------- Modulos -----------------*/
const dotenv = require('dotenv').config();
const logger = require('../utils/logger');

/* --- Modulos para la config MongoDB Atlas */
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST} = process.env;

/* ------ Configuración Conexión ------ */
const mongoConfig = {
    useNewUrlparser: true,
    useUnifiedTopology: true
};

/* ------ Configuración MongoDB_URL ------ */
const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/myFirstDatabase?retryWrites=true&w=majority`;

/* ------ Configuración conexión ------ */
const connectionMongoDB = async () =>{
    const connectMongoDB = async () =>{
        try {
            mongoose.connect( mongoUrl, mongoConfig )
            logger.info('MongoDB connected');
        } catch (error) {
            logger.error(error);
        }
    };
    connectMongoDB();
};

/* ------ Exports ------ */
module.exports = {mongoUrl, mongoConfig , connectionMongoDB}