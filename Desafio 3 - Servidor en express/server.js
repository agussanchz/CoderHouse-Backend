//Importo el contenedor donde poseo mis productos
const Contenedor = require("./contenedor");
const contenedor = new Contenedor("./texto.txt")

//Importo express
const express = require("express")
const app = express()


//Inicio del servidor
app.get("/", async (req, res) => {
    res.send("<h1>Bienvenidos</h1>")
})

//Url productos
app.get("/productos", async (req, res) => {
    const productos =  await contenedor.getAll()
    res.send(productos)
})

//Url producto random
app.get("/productoRandom", async (req, res) => {
    const producto = await contenedor.getRandom()
    res.send(producto)
})

//Creacion del puerto
const PORT = 8080

//Llamado al servidor
const server = app.listen(PORT, () => {
    console.log(`server en ${server.address().port}`)
})