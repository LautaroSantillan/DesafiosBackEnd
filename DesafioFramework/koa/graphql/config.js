const { buscarUsuariosGQL , crearUsuarioGQL } = require('../config/mongoConection')
const { graphqlHTTP } = require('express-graphql')
const { schema } = require('../graphql/schema.js')

const configGraphql = {
    schema: schema,
    rootValue: {
        buscarUsuariosGQL,
        crearUsuarioGQL,
    },
    graphiql: true,
}

const graphql = graphqlHTTP(configGraphql)

module.exports = graphql