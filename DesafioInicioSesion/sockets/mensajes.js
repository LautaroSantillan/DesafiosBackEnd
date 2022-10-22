const { normalizar, desnormalizar } = require('../API/normalizar.js');
const ContenedorMensajes = require('../clases/contenedorMensajeArchivo');
const contenedorMensajes = new ContenedorMensajes( './databases/mensajes.json');

const mensajes = async (socket, io) =>{
    const getMensajes = await contenedorMensajes.getAll();
    const messages = getMensajes;

    let pesoOriginal = JSON.stringify(messages).length;
    console.log(`Al princio el tamao del archivo era de: `, pesoOriginal);

    const normalizedMensajes = normalizar(messages);
    console.log(`Luego el tamaño del archivo quedó en: `, JSON.stringify(normalizedMensajes).length);    
    
    const denormalizedMensajes = desnormalizar(normalizedMensajes);
    //console.log(JSON.stringify(denormalizedMensajes).length);

    let pesoComprimido = JSON.stringify(normalizedMensajes).length;
    const compresion = ((pesoComprimido * 100) / pesoOriginal).toFixed(2);
    console.log(`El porcentaje de compresión ha sido del: ${compresion} %`);

    socket.emit('mensaje-servidor-chat', messages, compresion);
    socket.on('message-nuevo', async (message, cb) =>{        
        await contenedorMensajes.save(message)
        const messages = await contenedorMensajes.getAll();
        io.sockets.emit('mensaje-servidor-chat', messages, compresion);
    })
}

module.exports = mensajes

