const server = io().connect()

const addProduct = (evt) => {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    
    const producto = {title, price, thumbnail}
    
    server.emit('producto-nuevo', producto, (id) =>{
        console.log(id);
    })
    return false
}

const addMessage = (evt) =>{
    const id = document.getElementById('email').value
    const author = {
        id: document.getElementById('email').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value,
    }
    const text = document.getElementById('text').value
    //const date = new Date()
    //const fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}hs:${date.getMinutes()}min:${date.getSeconds()}seg`
    const message = {id, author, text}
    
    server.emit('message-nuevo', message, (id) =>{
        console.log(id);
    })

    return false
}

const insertCompresionHTML = compresion =>{
    let div = document.getElementById('compresion')  
    const resultado = `Se utiliza un sistema que comprime el ${compresion}%`
    div.innerHTML = resultado
}

const renderProductos = productos => {
    let listado = document.getElementById('list')        
    fetch('../views/partials/listaProductos.hbs')
        .then((res) => res.text())
        .then((data) =>{
            const template = Handlebars.compile(data)
            const html = template({
                productos: productos,
                title: title,
                price: price,
                thumbnail: thumbnail
            })
            listado.innerHTML = html 
    })
}

const renderMensajes =  ( messages) =>{
    let listadoMensajes = document.getElementById('messages')
    fetch('../views/partials/mensajes.hbs')
    .then((res) => res.text())
    .then((data) =>{
        const template = Handlebars.compile(data)
        const html = template({ 
            messages: messages 
        })       
        listadoMensajes.innerHTML = html 
    })
}

/* ---- server escucha mensaje para insertar productos ------- */
server.on('mensaje-servidor-productos', ( productos ) =>{
    renderProductos (productos)
})


/* ---- server escucha mensaje para insertar mensajes ------ */
server.on('mensaje-servidor-chat', (messages, compresion) =>{
    renderMensajes (messages)
    insertCompresionHTML(compresion)
    
})

