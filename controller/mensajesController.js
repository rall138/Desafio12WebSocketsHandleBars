const express = require('express')
const fs = require('fs')
const { resolve } = require('path')

class mensajesController{

    constructor(){

        this.mensajesRouter = express.Router()
        this.mensajes = []

        this.mensajesRouter.get('/mensajes', (req, res) =>{
            const templateFile = fs.readFileSync(__dirname+'/../public/centroMensajes.hbs', 'utf8')
            const collection = fs.readFileSync(__dirname+'/../files/messages.txt', 'utf-8')
            res.send({template: templateFile, data: JSON.parse(collection)})
        })

        this.mensajesRouter.post('/mensajes', (req, res) =>{
            const newMensaje = req.body
            try{
                this.addmensaje(newMensaje)
            }catch(error){
                res.render('errorPage', {error: error})
            }
        })
    }

    async addmensaje(newMensaje){
        if(!this.isNullOrUndefined(newMensaje)){
            const mensajes = await fs.promises.readFile(__dirname+'/../files/messages.txt', 'utf-8')
            const mensajesObj = JSON.parse(mensajes)
            mensajesObj.push(newMensaje)
            fs.promises.writeFile(__dirname+'/../files/messages.txt', JSON.stringify(mensajesObj, null, 2))
            .then(() => {
                console.log('Mensajes guardados correctamente')
            })

        }else{
            throw new Error('Mensaje nulo')
        }
    }

    isNullOrUndefined(objeto){
        return (objeto === null || objeto === undefined)
    }

    getRouter(){
        return this.mensajesRouter
    }


}

module.exports = mensajesController