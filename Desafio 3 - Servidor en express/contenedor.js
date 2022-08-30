const fs = require("fs")

class Contenedor{
    constructor(ruta){
        this.ruta = ruta  
    }

    //Traer todos los productos
    async getAll(){
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf8')
            const fileDataParse = JSON.parse(fileData)

            if(fileDataParse.length){
                return fileDataParse
            } else{
                console.log("No hay productos cargados.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Traer un producto al azar
    async getRandom(){
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf8')
            const fileDataParse = JSON.parse(fileData)

            const max = fileDataParse.length
            const min = 0
            const id = Math.ceil(Math.random() * (max - min))
           
            const producto = fileDataParse.find((product) => product.id === id)

            if(producto){
                return producto
            } else {
                console.log("No existe el producto")
            }

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor