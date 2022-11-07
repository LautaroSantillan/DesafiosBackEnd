const yargs = require('yargs/yargs')(process.argv.slice(2));

const args = yargs
    .default({
        puerto: 9090
    })
    .argv

const puerto = args.puerto;

module.exports = puerto