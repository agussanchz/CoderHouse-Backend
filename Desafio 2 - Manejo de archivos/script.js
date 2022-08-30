const Contenedor = require("./contenedor");


const contenedor = new Contenedor("./texto.txt")

contenedor.save ({
    name: "Zapatillas Nike zooom", 
    price: 1000, 
    category: "Zapatillas deportivas"
})


//Ingresar id en la funcion para que compara si existe o no el producto
// contenedor.getById()

//Traer todos los productos
// contenedor.getAll()

//Eliminar productos por id
// contenedor.deleteById()

//Borrar todo el contenedor
// contenedor.deleteAll()
