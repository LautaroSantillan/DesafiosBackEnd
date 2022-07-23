class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return console.log(`${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota){
		this.mascotas.push(mascota);
    }

    countMascotas(){
        return console.log(this.mascotas.length);
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames(){
        return console.log(this.libros.map(libros => libros.nombre));
    }
}

const Lautaro = new Usuario('Lautaro', 'Santillan', [{nombre: 'Harry Potter', autor: 'J. K. Rowling'}], ['perro']);

Lautaro.addMascota('tortuga');

Lautaro.getFullName()

Lautaro.countMascotas();

Lautaro.addBook('El señor de los anillos', 'J. R. R. Tolkien');

Lautaro.getBookNames();