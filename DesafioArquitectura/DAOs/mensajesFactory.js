const ContenedorMensajesArchivo = require('./mensajes/contenedorMensajeArchivo')            
const ContenedorMensajesSQLite = require('./mensajes/contenedorMensajesSQLite')

class MensajesFactory {
    static get(tipo){
        switch (tipo) {
            case 'file':
                return new ContenedorMensajesArchivo( './databases/mensajes.json');
            case 'sqlite':
                return new ContenedorMensajesSQLite('./databases/ecommerce.sqlite')
            default:
                return new ContenedorMensajesArchivo( './databases/mensajes.json');
        }
    }
}

module.exports = MensajesFactory