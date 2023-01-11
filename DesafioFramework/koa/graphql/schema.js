const { buildSchema } = require('graphql')

/* ---- modo de schema con buildSchema ---- */
const schema = buildSchema(`

    input UsuarioInput {
        userEmail: String,
        password: String
    }

    type Usuario {
        userEmail: String,
        password: String
    }
    type Query {
        buscarUsuariosGQL(username: String): Usuario,
    }

    type Mutation {
        crearUsuarioGQL(usuario: UsuarioInput): Usuario
    }

`)

module.exports = { schema }