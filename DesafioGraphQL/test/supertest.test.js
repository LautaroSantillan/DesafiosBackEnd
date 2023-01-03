const supertest = require('supertest')
const { expect } = require('chai')
const httpServer = require('../server')
const generarUser = require('../utils/newUser.js')
const { connectMongoDB } = require('../config/mongoConection')
const mongoose = require('mongoose')

let request
let server

const startServer = async () => {
    return new Promise((resolve, reject) => {
        const PORT = 8082
        const server = httpServer.listen(PORT, () => {
            console.log(`Server is listenning en el puerto ${PORT} - Process ID: ${process.pid}. Date: ${new Date().toLocaleDateString()}`)
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        });
    })
}
const usuario = generarUser()

describe('test api rest full', () => {

    before(async () => {
        await connectMongoDB()
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}`)
    })

    after( async () => {
        //mongoose.disconnect()
        server.close()
    })

    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            const response = await request.get('/signup')
            expect(response.status).to.eql(200)
        })
    })

    describe('POST', () => {
        it('debería incorporar un usuario', async () => {
            console.log('Console.log usuario para prueba', usuario )
            const response = await request.post('/signup').send(usuario)
            expect(response.status).to.eql(302)
        })
        
    describe('POST', () => {
        it('debería retornar un status 302 al loguear usuario porque lo redirecciona al home', async () => {
            const response = await request.post('/login').send(usuario)
            expect(response.status).to.eql(302)
        })
    })
/*             const user = response.body
            expect(user).to.include.keys('username','password')
            expect(user.username).to.eql(usuario.username)
            expect(user.password).to.eql(usuario.password) 
        }) */
    })
})