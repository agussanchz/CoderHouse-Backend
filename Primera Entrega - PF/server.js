//Importacion de las rutas
const routerProducts = require("./routers/routerProducts")
const routerCarrito = require("./routers/routerCarrito")

//Creacion de .env
const dotenv = require("dotenv").config()

//Importo express
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))


//Ruta productos
app.use('/api/productos', routerProducts)

//Ruta carrito
app.use('/api/carrito', routerCarrito)


//Creacion del puerto
const PORT = process.env.PORT


//Llamado al servidor en puerto 8080
const server = app.listen(PORT, () => {
    console.log(`Server en ${server.address().port}`)
})
