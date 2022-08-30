const fs = require("fs")

class Productos{
    constructor(ruta){
        this.ruta = ruta
    }


    //Crear objeto con su respectivo Id
    async save(obj){
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf-8')
            const fileDataParse = JSON.parse(fileData)

            if(fileDataParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify([...fileDataParse, { ...obj, timestamp: Date.now(), id: fileDataParse[fileDataParse.length - 1].id + 1} ], null,2))
            } else{
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, timestamp: Date.now(), id: 1 }], null,2))
            }

            return fileDataParse.length + 1

        } catch (error) {
            console.log(error)
        }
    }

    //Recibe un objeto y actualiza segun su id
    async update(obj){
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf-8')
            const fileDataParse = JSON.parse(fileData)

            const objIndex = fileDataParse.findIndex(prod => prod.id === obj.id)

            if(objIndex !== -1){
                fileDataParse[objIndex] = obj
                await fs.promises.writeFile(this.ruta, JSON.stringify(fileDataParse, null,2))
                return {msg: 'producto actualizado'}
            } else {
                return {error:'producto no encontrado'}
            }

        } catch (error) {
            console.log(error)
        }
    }
    
    //Traer todos los productos
    async getAll() {
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

    //Traer producto segun su ID
    async getById(id) {
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf-8')
            const fileDataParse = JSON.parse(fileData)

            const product = fileDataParse.find(product => product.id === id)

            if(product){
                return product
            } else {
                return null
            }

        } catch (error) {
            console.log(error)
        }
    }

    //Eliminar producto segun su ID
    async deleteById(id){
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf-8')
            const fileDataParse = JSON.parse(fileData)

            const product = fileDataParse.find(product => product.id === id)

            if(product){
                const productFilter = fileDataParse.filter(product => product.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(productFilter, null, 2), 'utf-8')
                console.log("producto eliminado")
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Eliminar todos los productos
    async deleteAll(){
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
    }
}

module.exports = Productos