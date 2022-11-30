const express = require("express");
const { Router } = express;
const router = Router();

const modoServer = require("../config/modoServer");
const os = require('os');
const CPUs = os.cpus()

/* --------- gzip ------------- */
const compression = require('compression');
const logger = require("../utils/logger");
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

router.get('/info-compress', compression() , async (req,res) =>{    
    try{
        logger.info('GET /info-compress' )
        proceso = process.memoryUsage()
        respuesta = {
            argumentos: process.argv.slice(2),
            plataforma: process.platform,
            version: process.version,
            rss: JSON.stringify(proceso),
            path: process.argv[1],
            id: process.pid,
            carpeta: process.cwd(),
            procesos: cantidad(),
            compress: 'Hola'.repeat(6000),
        }
        res.status(200).render('info', {respuesta})
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
})


module.exports = router;