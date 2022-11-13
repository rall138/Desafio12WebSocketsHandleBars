const socket = io.connect()

function agregarProducto(e){
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        foto: document.getElementById('foto').value
    }
    socket.emit('nuevo-producto', producto)
    return false
}

function enviarMensaje(e){
    const mensaje = {
        mensaje: document.getElementById('mensaje').value,
        correo: document.getElementById('correo').value,
        fechaHora: (new Date()).toLocaleString()
    }
    socket.emit('nuevo-mensaje', mensaje)
    return false
}

socket.on('lista-mensajes', data => {

    // en vez de hacer un fetch por la coleccion, hacer un fecth por la pagina procesada de productos mediante el render del lado servidor.
    fetch('http://localhost:8080/mensajes')
    .then(result =>  result.json())
    .then(fetchData => {
        const template = Handlebars.compile(fetchData.template)
        const html = template({mensajes: data})
        document.getElementById('mensajes-placeholder').innerHTML = html
    })

})

socket.on('lista-productos', data => {

    // en vez de hacer un fetch por la coleccion, hacer un fecth por la pagina procesada de productos mediante el render del lado servidor.
    fetch('http://localhost:8080/productos')
    .then(result =>  result.json())
    .then(fetchData => {
        const template = Handlebars.compile(fetchData.template)
        const html = template({productos: data})
        document.getElementById('productos-placeholder').innerHTML = html
    })

})