const fs = require("fs")

class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }

    //Crear objeto con su respectivo Id
    async save (obj){
        try {
            let fileData = await fs.promises.readFile(this.ruta, 'utf-8')
            let fileDataParse = JSON.parse(fileData)

            if(fileDataParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify([...fileDataParse, { ...obj, id: fileDataParse[fileDataParse.length - 1].id + 1 } ], null,2))
            } else{
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: 1 }], null,2))
            }

            return fileDataParse.length + 1

        } catch (error) {
            console.log(error)
        }
    }

    //Traer productos por Id
    async getById(id){
        try {
            let fileData = await fs.promises.readFile(this.ruta, 'utf8')
            let fileDataParse = JSON.parse(fileData)
    
            let product = fileDataParse.find(product => product.id === id)
    
            if(product){
                return product
            } else {
                return null
            }

        } catch (error) {
            console.log(error)
        }
    }


    //Traer todos los productos
    async getAll(){
        try {
            let fileData = await fs.promises.readFile(this.ruta, 'utf8')
            let fileDataParse = JSON.parse(fileData)

            if(fileDataParse.length){
                return fileDataParse
            } else{
                console.log("No hay productos cargados.")
            }
        } catch (error) {
            console.log(error)
        }
    }


    //Eliminar productos por id
    async deleteById(id){
        let fileData = await fs.promises.readFile(this.ruta, 'utf8')
        let fileDataParse = JSON.parse(fileData)

        let product = fileDataParse.find(item => item.id === id)
        if (product){
            const productFilter = fileDataParse.filter(product => product.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(productFilter, null, 2), 'utf-8')
            console.log("producto eliminado")
        } else{
            console.log("no existe el producto")
        }
    }

    //Eliminar todos los productos
    async deleteAll(){
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
    }
}

module.exports = Contenedor