const server = io().connect()

const generarProductos = () =>{
    console.log('se emite el producto msj');
    server.emit('productos-test', (id) =>{
        console.log(id);
    })

    return false
}

const getGenerar = document.getElementById('generarProductos')
getGenerar.addEventListener('click', () =>{
    console.log('estamos por aca');
    generarProductos()
})

const renderProductosTest = (productosTest) =>{

    let listado = document.getElementById('listProductosTest')

    fetch('../views/partials/productosTest.hbs')
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
    console.log('mensaje-servidor-productosTest');
    renderProductosTest (productosTest)
})