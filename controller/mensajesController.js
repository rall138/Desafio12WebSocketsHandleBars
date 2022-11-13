const express = require('express')
const fs = require('fs')

class mensajesController{

    constructor(){

        this.mensajesRouter = express.Router()
        this.mensajes = []

        this.mensajesRouter.get('/mensajes', (req, res) =>{
            const templateFile = fs.readFileSync(__dirname+'/../public/centroMensajes.hbs', 'utf8')
            res.send({template: templateFile, mensajes: this.mensajes})
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

    addmensaje(newMensaje){
        if(!this.isNullOrUndefined(newMensaje)){
            newMensaje.precio = parseFloat(newMensaje.precio)
            this.mensajes.push(newMensaje)
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