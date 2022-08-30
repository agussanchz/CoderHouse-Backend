//Importo el contenedor donde poseo las funciones
const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./texto.txt")

//Importo express
const express = require('express')
const app = express()


//Creacion de las rutas
const { Router } = express
const routerProductos = Router()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

//Agregar un producto con su respectivo id
routerProductos.post('/', async (req, res) => {
    const object = req.body  
    const products = await contenedor.save(object)
    res.json(products)
})

//Traer todos los productos
routerProductos.get('/', async (req, res) => {
    const products = await contenedor.getAll()
    res.json(products)
})

//Traer productos por id
routerProductos.get('/:id', async (req, res) => {
    const { id } = req.params
    const product = await contenedor.getById(+id)
    res.json(product)
})

//Recibe y actualiza un producto por su id
routerProductos.put('/:id', (req, res) => {
    const {id} = req.params
    const object = req.body
    const product = contenedor.update({id: parseInt(id), ...object})
    res.json(product)
 })


//Eliminar producto por id
routerProductos.delete('/:id', async (req, res) => {
    const { id } = req.params
    const product = await contenedor.deleteById(+id)
    res.json(product)
})


app.use('/api/productos', routerProductos)



//Creacion del puerto
const PORT = 8080

//Llamado al servidor en puerto PORT
const server = app.listen(PORT, () => {
    console.log(`Server en ${server.address().port}`)
})

