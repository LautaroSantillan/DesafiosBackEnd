const express = require("express");
const { Router } = express;
const router = Router();
const { fork } = require('child_process');

router.get('/api/randoms/:cant', async (req,res) =>{    
    try{        
        const childProcess = fork('./childProcess/randoms.js');
        const cantidad = Number(req.params.cant);
        childProcess.send(cantidad);
        childProcess.on('message', mensaje =>{
            res.status(200).json(mensaje);
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

router.get('/api/randoms', async (req,res) =>{    
    try{
        const cantidad = 100000000;
        const childProcess = fork('./childProcess/randoms.js');
        childProcess.send(cantidad);
        childProcess.on('message', mensaje =>{
            res.status(200).json(mensaje);
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router;