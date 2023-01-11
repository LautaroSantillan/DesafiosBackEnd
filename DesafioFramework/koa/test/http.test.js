const http = require('http')

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET'
}
/* -------- GET de productos --------  */
const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    
    res.on('data', d => {
        process.stdout.write(d)
    })
})
req.on('error', error => { 
    console.log(error)
})
req.end()
/* -------- POST de productos --------  */

/* const data = JSON.stringify(
    {
        title: 'httpPrueba',
        price: '999',
        thumbnail: ''
    }
)
const optionsPost = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-length': data.length
    }
}
const reqPost = http.request(optionsPost, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})
reqPost.on('error', error => {
    console.log(error)
})
reqPost.write(data)
reqPost.end() */