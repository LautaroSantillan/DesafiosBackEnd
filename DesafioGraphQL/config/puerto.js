const yargs = require('yargs/yargs')(process.argv.slice(2))

const args = yargs
    .default({
        puerto: 8080
    })
    .alias({
        p: 'puerto'
    })
    .argv

const puerto = args.puerto

module.exports = puerto