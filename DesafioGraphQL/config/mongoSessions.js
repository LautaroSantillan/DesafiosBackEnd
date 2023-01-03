const MongoStore = require('connect-mongo');
const dotenv = require('dotenv').config()

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST} = process.env

const mongoConfig = {
    useNewUrlparser: true,
    useUnifiedTopology: true
}

const mongoSessions = MongoStore.create({mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig})

module.exports = mongoSessions