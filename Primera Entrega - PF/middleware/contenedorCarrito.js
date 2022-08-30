const fs = require("fs")

class Carrito {
    constructor(ruta){
        this.ruta = ruta
    }
    //Crear carrito con su respectivo id
    async save(){
        const timestamp = Date.now()
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf-8')
            const fileDataParse = JSON.parse(fileData)

            if(fileDataParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify([...fileDataParse, { timestamp: timestamp, id: fileDataParse[fileDataParse.length - 1].id + 1, productos: [] } ], null,2))
            } else{
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ timestamp: timestamp, id: 1, productos: [] }], null,2))
            }

            return fileDataParse.length + 1

        } catch (error) {
            console.log(error)
        }
    }

    //Eliminar y vaciar carrito
    async deleteById(id){
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf-8')
            const fileDataParse = JSON.parse(fileData)

            const carrito = fileDataParse.find(carrito => carrito.id === id)

            if(carrito){
                const carritoFilter = fileDataParse.filter(carrito => carrito.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(carritoFilter, null, 2), 'utf-8')
                console.log("carrito eliminado")
            }else{
                console.log("carrito no existe")
            }

        } catch (error) {
            console.log(error)
        }
    }

    //Agregar producto al carrito
    async addProduct(id, obj){
        const timestamp = Date.now()

        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf-8')
            const fileDataParse = JSON.parse(fileData)

            const carrito = fileDataParse.find(carrito => carrito.id === id)
            console.log(carrito)

            if(carrito){
                if(carrito.productos.length){
                    const producto = { timestamp: timestamp, id: carrito.productos.length +1 , ...obj }
                    carrito.productos.push(producto) 
                    await fs.promises.writeFile(this.ruta, JSON.stringify(fileDataParse, null, 2))
                }else{
                    const producto = { timestamp: timestamp, id: 1 , ...obj }
                    carrito.productos.push(producto)
                    await fs.promises.writeFile(this.ruta, JSON.stringify(fileDataParse, null, 2))
                }
                console.log("producto agregado al carrito exitosamente")
            }else{
                console.log("producto no agregado")
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Traer todos los productos de un carrito 
    async getAll(id) {
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf8')
            const fileDataParse = JSON.parse(fileData)

            const carrito = fileDataParse.find(carrito => carrito.id === id)

            if(carrito){
                return carrito.productos
            }else{
                console.log("No se encuentran productos en el carrito.")
            }

        } catch (error) {
            console.log(error)
        }
    }

    //Borrar producto de un carrito determinado
    async deleteProd(id, id_prod) {
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf8')
            const fileDataParse = JSON.parse(fileData)

            const carrito = fileDataParse.find(carrito => carrito.id === id)
            

            if(carrito){
                const productFilter = carrito.productos.filter(product => product.id !== id_prod)

                carrito.productos = productFilter

                await fs.promises.writeFile(this.ruta, JSON.stringify(fileDataParse, null, 2))

            }else{
                console.log("Producto no existente")
            }

        } catch (error) {
            
        }
    }
}

module.exports = Carrito