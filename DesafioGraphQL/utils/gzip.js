const compression = require('compression');
const logger = require("../utils/logger");
const modoServer = require("../config/modoServer");
const os = require('os');
const CPUs = os.cpus()
/* ---------- ----------------- */
const cantidad = () =>{
    let cantidad = Number
    if(modoServer === 'fork'){
        cantidad = 1
    }else{
        cantidad = CPUs.length
    }
    return cantidad
}

module.exports = cantidad