const yargs = require('yargs/yargs')(process.argv.slice(2))

const args = yargs
    .default({
        modo: 'fork'
    })
    .alias({
        m: 'modo'
    })
    .argv

const modoServer = args.modo

module.exports = modoServer