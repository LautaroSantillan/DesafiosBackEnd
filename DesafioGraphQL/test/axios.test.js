const axios = require('axios')

const url = 'http://localhost:8080'

/* axios.get(url) 
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err)) */

/* axios( {
    method: 'post',
    url: 'http://localhost:8080/signup',
    data: {
        username: 'test@test',
        password:  'test'
    }
}); */

axios( {
    method: 'post',
    url: 'http://localhost:8080/login',
    data: {
        username: 'test@test',
        password:  'test'
    }
})
    .then(res => {
        console.log(res.status)
        console.log(res.headers)
    })
    .catch(err => console.log(err))

