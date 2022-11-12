const express = require('express')
const fs = require('fs')

class productosController{

    constructor(){

        this.productosRouter = express.Router()
        //this.productos = []
        
        this.productos = 
        [{nombre: 'Azucar', precio: 43, foto:'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Strawberry-64.png'}, 
        {nombre: 'Harina', precio: 35, foto: 'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Camera-64.png'}, 
        {nombre: 'Asado', precio: 200, foto: 'https://cdn1.iconfinder.com/data/icons/city-flat-2/512/hydrant_water_fire_safety_emergency_protection_urban_city-64.png'}]
        
        this.productosRouter.get('/', (req, res) =>{
            res.render('producto')
        })

        this.productosRouter.get('/productos', (req, res) =>{
            const templateFile = fs.readFileSync(__dirname+'/../public/productos.hbs', 'utf8')
            res.send({template: templateFile, productos: this.productos})
        })

        this.productosRouter.post('/productos', (req, res) =>{
            const newProducto = req.body
            try{
                this.addProduct(newProducto)
                res.render('producto')
            }catch(error){
                res.render('errorPage', {error: error})
            }
        })
    }

    addProduct(newProducto){
        if(!this.isNullOrUndefined(newProducto)){
            newProducto.precio = parseFloat(newProducto.precio)
            if (!this.isNullOrUndefined(this.productos.filter(p => p.nombre === newProducto.nombre)[0])){
                throw new Error(`El producto ${newProducto.nombre} ya existe`)
            }
            this.productos.push(newProducto)
        }else{
            throw new Error('Producto nulo')
        }
    }

    isNullOrUndefined(objeto){
        return (objeto === null || objeto === undefined)
    }

    getRouter(){
        return this.productosRouter
    }


}

module.exports = productosController