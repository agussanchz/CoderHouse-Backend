//Importo el contenedor donde poseo las funciones
const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./texto.txt")

//Importo express
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Configurando ejs como motor de visualizacion
app.set("view engine", "ejs")
app.set("views", "./views")

app.use(express.static("public"));

//Generando las rutas
app.get("/", (req, res) =>{
    res.render("main")
})

app.get("/productos", async (req, res) => {
    const products = await contenedor.getAll()
    const productExist = products.length > 0;

    res.render("partials/products.ejs", {list: products, productExist})
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

