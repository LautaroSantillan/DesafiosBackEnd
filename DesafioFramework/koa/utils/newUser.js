const { faker } = require('@faker-js/faker');
faker.locale = 'es'

const generarUser = () => {
    return {
        username: faker.internet.email(),
        password: faker.name.fullName()
    }
}

module.exports = generarUser