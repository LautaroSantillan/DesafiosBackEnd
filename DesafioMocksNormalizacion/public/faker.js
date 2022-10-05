const server = io().connect()

const generarProductos = () =>{

    server.emit('productos-test', (id) =>{
        console.log(id);
    })

    return false
}

const renderProductosTest = (productosTest) =>{

    let listado = document.getElementById('listProductosTest')

    fetch('/partials/productosTest.hbs')
        .then((res) => res.text())
        .then((data) =>{
            const template = Handlebars.compile(data)
            console.log(productosTest);
            const html = template({
                productos: productosTest,
                id: productosTest.id,
                title: productosTest.title,
                price: productosTest.price,
                thumbnail: productosTest.thumbnail
            })
            listado.innerHTML = html 
    })

}

server.on('mensaje-servidor-productosTest', (productosTest) =>{
    renderProductosTest (productosTest)
})