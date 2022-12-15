const ContenedorProductosSQL = require('./productos/contenedorProductosSQL.js')

class ProductosFactory {
    static get(tipo) {
        switch (tipo) {
            case 'sql':
                return new ContenedorProductosSQL('../databases/ecommerce.sqlite');
            default:
                return new ContenedorProductosSQL('./productos.json');
        }
    }
}

module.exports = ProductosFactory