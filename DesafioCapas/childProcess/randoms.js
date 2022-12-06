const { number } = require("yargs")

const calcularRandoms = (cant) =>{
    const cantidad = cant || 100000000
    const arrayAleatorios = []

    for(let i=0; i < cantidad; i++){
        const numero = Math.floor(Math.random() * 1000000000 + 1)
        arrayAleatorios.push(numero)
    }
    let aleatorios = {}

    arrayAleatorios.forEach(x=>{
        aleatorios[x] = x 
    })

    return aleatorios
}

process.on('message', cantidad => {
    process.send( calcularRandoms(cantidad))
})

