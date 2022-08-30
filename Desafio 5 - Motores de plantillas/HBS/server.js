//Importo el contenedor donde poseo las funciones
const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./texto.txt")

//Importo express
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Importo handlebars
const handlebars = require("express-handlebars")

//Configuracion de handlebars
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main.hbs",
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views/partials"
    })
)

//Establezco el motor de plantilla 
app.set("view engine", "hbs")

//Establezco directorio donde se encuentran los archivos de plantilla
app.set("views", "./views")

app.use(express.static('public'))


//Generando las rutas
app.get('/', (req,res) => {
    res.render('layouts/form.hbs')
})


app.get('/productos', async (req,res) => {
    const products = await contenedor.getAll()
    const prodExist = products.length > 0;

    res.render('layouts/index.hbs', 
    {list: products, prodExist})
})

app.post('/productos', async (req, res) => {
    const object = req.body  
    const products = await contenedor.save(object)
    console.log(products)
    res.redirect('/productos')
})

//Creacion del puerto
const PORT = 8080

//Llamado al servidor en puerto PORT
const server = app.listen(PORT, () => {
    console.log(`Server en ${server.address().port}`)
})

