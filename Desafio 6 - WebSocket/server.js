//Importo el contenedor donde poseo las funciones
const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./texto.txt")
const chat = new Contenedor("./chat.txt")

//Importo express
const express = require('express')
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//Configurando ejs como motor de visualizacion
app.set("view engine", "ejs")
app.set("views", "./views")

app.use(express.static("views"));

//Generando las rutas
app.get("/", (req, res) =>{
    res.render("main")
})

app.get("/productos", async (req, res) => {
    const products = await contenedor.getAll()
    const productExist = products.length > 0;

    res.render("partials/products.ejs", {list: products, productExist})
})


//Socket para mensajes
const messages = []

io.on("connection", (socket) => {
    console.log("cliente conectado")

    socket.emit("messages", messages)

    socket.on("new-message", async (data) =>{
        await chat.save(data)
        messages.push(data)
        io.sockets.emit("messages", messages)
    })
})


//Socket para productos
const products = []

io.on("connection", (socket) => {
    socket.emit("products", products)

    socket.on("new-products", async(data) =>{
        await contenedor.save(data)
        products.push(data)
        io.sockets.emit("products", products)    
    })
})



//Creacion del puerto
const PORT = 8080

//Llamado al servidor en puerto PORT
httpServer.listen(PORT, () => {
    console.log(`Server en ${httpServer.address().port}`)
})


