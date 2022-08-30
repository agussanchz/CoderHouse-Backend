const Productos = require("../middleware/contenedorProductos")
const contenedorProducts = new Productos("./database/productos.json")

const express = require('express')
const { Router } = express
const routerProductos = Router()

//Variable para validar que accion realiza el administrador y cliente
const admin = true


//Agregar un producto con su respectivo id
routerProductos.post('/', async (req, res) => {
    if(admin){
        const object = req.body  
        const products = await contenedorProducts.save(object)
        res.json(products)
    }else{
        console.log("Accion solo para administradores")
        res.json({
            error: -1,
            descripcion: "ruta 'http://localhost:8080/' metodo POST no autorizado"
        })
    }
})

//Traer todos los productos
routerProductos.get('/', async (req, res) => {
    const products = await contenedorProducts.getAll()
    res.json(products)
})

//Traer productos por id
routerProductos.get('/:id', async (req, res) => {
    const { id } = req.params
    const product = await contenedorProducts.getById(+id)
    res.json(product)
})

//Recibe y actualiza un producto por su id
routerProductos.put('/:id', (req, res) => {
    if(admin){
        const {id} = req.params
        const object = req.body
        const product = contenedorProducts.update({id: parseInt(id), ...object})
        res.json(product)
    }else{
        console.log("Accion solo para administradores")
        res.json({
            error: -1,
            descripcion: "ruta 'http://localhost:8080/api/productos/:id' metodo PUT no autorizado "
        })
    }
 })

//Eliminar producto por id
routerProductos.delete('/:id', async (req, res) => {
    if(admin){
        const { id } = req.params
        const product = await contenedorProducts.deleteById(+id)
        res.json(product)
    }else{
        console.log("Accion solo para administradores")
        res.json({
            error: -1,
            descripcion: "ruta 'http://localhost:8080/api/productos/:id' metodo DELETE no autorizado"
        })
    }
})

//Ruta no existente
routerProductos.get("*", async (req, res) => {
	res.json({
		error: -2,
		description: "Ruta no existente"
	});
});
module.exports = routerProductos;