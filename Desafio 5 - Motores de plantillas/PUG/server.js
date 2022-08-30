//Importo el contenedor donde poseo las funciones
const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./texto.txt")

//Importo express
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Establezco el motor de plantilla
app.set("view engine", "pug")

//Establezco directorio donde se encuentran los archivos de la plantilla
app.set("views", "./views")

//Generando rutas
app.get("/", (req, res) => {
    res.render('main.pug', {titulo: "Agregue un producto"})
})

app.get("/productos", async (req, res) => {
    const products = await contenedor.getAll()
    const productExist = products.length > 0;

    res.render("partials/products.pug", {list: products, productExist})
})

app.post("/productos", async (req,res) => {
    const object = req.body
    const products = await contenedor.save(object)
    console.log(products)

    res.redirect("/productos")
})


//Creacion del puerto
const PORT = 8080

//Llamado al servidor en puerto PORT
const server = app.listen(PORT, () => {
    console.log(`Server en ${server.address().port}`)
})

