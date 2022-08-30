const fs = require("fs")
 
class Contenedor{
    constructor(ruta){
        this.ruta = ruta  
    }

    //Crear objeto con su respectivo Id
    async save(obj){
        try {
            const fileData = await fs.promises.readFile(this.ruta, 'utf-8')
            const fileDataParse = JSON.parse(fileData)

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
}

module.exports = Contenedor