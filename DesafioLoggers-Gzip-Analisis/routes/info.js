const express = require("express");
const { Router } = express;
const router = Router();

router.get('/info', async (req,res) =>{    
    try{
        proceso = process.memoryUsage();
        respuesta = {
            argumentos: process.argv.slice(2),
            plataforma: process.platform,
            version: process.version,
            rss: JSON.stringify(proceso),
            path: process.argv[1],
            id: process.pid,
            carpeta: process.cwd(),
        };
        res.status(200).render('info', {respuesta});
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router;