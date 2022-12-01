const MongoStore = require('connect-mongo');
const dotenv = require('dotenv').config()
const { mongoUrl, mongoConfig } = require('./connectionMongoDB');
// 
const mongoSessions = MongoStore.create({mongoUrl: mongoUrl, mongoOptions: mongoConfig})

module.exports = mongoSessions