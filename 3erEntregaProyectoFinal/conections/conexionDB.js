/* --- productos ----- */
const optionsMySQL = {
    client: 'mysql',
    connection: {
        host: 'localhost',  //127.0.0.1
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
}
/* ---- mensajes ------  */

const optionsSQLite3 = {
    client:'sqlite3',
    connection: {
        filename: './databases/ecommerce.sqlite',
    },
    useNullAsDefault: true
}

module.exports = { optionsMySQL, optionsSQLite3 }
