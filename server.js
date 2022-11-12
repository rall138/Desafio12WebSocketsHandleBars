const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const handlebars = require('express-handlebars')
const productosController = require('./controller/productosController.js')

const app = express()
const PORT = 8080
const httpServer = http.createServer(app)
const io = socketIo(httpServer)

//Configuración de handlebars
app.engine('hbs', 
    handlebars.engine({
        extname: '.hbs', // extensión de los archivos template.
        defaultLayout: 'index.hbs', // plantilla principal.
        layoutsDir: __dirname + '/views/layouts', // ruta a la plantilla principal.
        partialsDir: __dirname + '/views/partials' // ruta a las plantillas parciales.
    })
)

app.use(express.static('./public'))
app.set('views', './views') // Le dice donde estarán alojadas las plantillas.
app.set('view engine', 'hbs') // Le dice cual es el motor de procesamiento de esas plantillas.

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const controller = new productosController()
app.use('/', controller.getRouter())

httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
}).on('error', (error) => console.log(error))

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    
    socket.emit('lista-productos', controller.productos)
    socket.on('nuevo-producto', data=>{
        try{
            controller.addProduct(data)
        }catch(error){
            socket.emit('lista-productos', null)
        }
    })
})