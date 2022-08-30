class Usuario {
    constructor(name, surname, books, pets){
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }

    getFullName(){
        return `${this.name} ${this.surname}`
    }

    addMascotas(pet){
        this.pets.push(pet)
    }

    countMascotas(){
        return this.pets.length
    }

    addBook(name, autor){
        this.books.push({
            name,
            autor
        })
    }

    getBookNames(){
        return this.books.map(book => book.name)
    }
}

// DECLARACION DEL USER
const user = new Usuario (
    "Agustin", 

    "Sanchez",

    [{
        name:"Libro1", autor:"Autor1"
    }],

    ["perro", "gato"]
                        
)

//NOMBRE COMPLETO
console.log(`Nombre completo:`, user.getFullName())

// AGREGAR UNA MASCOTA AL ARRAY
user.addMascotas("tigre")

// MOSTRAR LA CANTIDAD DE MASCOTAS
console.log(`Total de mascotas`, user.countMascotas())

// AGREGAR UN LIBRO AL OBJETO BOOKS
user.addBook("Libro2", "Autor2")

// MOSTRAR LOS NOMBRES DE LOS LIBROS
console.log(`Libros disponibles:`, user.getBookNames())