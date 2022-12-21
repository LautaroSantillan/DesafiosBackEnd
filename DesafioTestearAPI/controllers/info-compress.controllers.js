const logger = require("../utils/logger")
const cantidad = require("../utils/gzip");

const getInfoCompress = async (req,res) =>{    
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
}

module.exports = getInfoCompress