const { createLogger, transport, transports, level } = require('winston')

const logger = createLogger({
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: `${__dirname}/../logs/warn.log`, level: 'warn' }),
        new transports.File({ filename: `${__dirname}/../logs/error.log`, level: 'error' }),
    ],
})

module.exports = logger