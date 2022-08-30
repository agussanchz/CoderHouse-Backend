const Carrito = require("../middleware/contenedorCarrito")
const contenedorCarrito = new Carrito("./database/carrito.json")


const express = require('express')
const { Router } = express
const routerCarrito = Router()


//Crear carrito con su id
routerCarrito.post("/", async(req,res) =>{
    const carrito = await contenedorCarrito.save()
    res.json(carrito)
})


//Vaciar y Eliminar Carrito por id
routerCarrito.delete('/:id', async (req, res) => {
    const { id } = req.params
    const vaciar = await contenedorCarrito.deleteById(+id)
    res.json(vaciar)
})


//Agregar un producto al carrito
routerCarrito.post('/:id/productos', async (req, res) => {
    const { id } = req.params
    const obj = req.body
    const carrito = await contenedorCarrito.addProduct(parseInt(id), obj)
    res.json(carrito)
})

//Traer todos los productos del carrito
routerCarrito.get('/:id/productos', async (req, res) => {
    const { id } = req.params
    const products = await contenedorCarrito.getAll(+id)
    res.json(products)
})

//Eliminar producto del carrito por id
routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params
    const product = await contenedorCarrito.deleteProd(parseInt(id), parseInt(id_prod))
    res.json(product)

})

//Ruta no existente
routerCarrito.get("*", async (req, res) => {
	res.json({
		error: -2,
		description: "Ruta no existente"
	});
});

module.exports = routerCarrito; 