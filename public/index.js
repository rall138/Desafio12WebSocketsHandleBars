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

socket.on('lista-productos', data => {

    // en vez de hacer un fetch por la coleccion, hacer un fecth por la pagina procesada de productos mediante el render del lado servidor.
    fetch('http://localhost:8080/productos')
    .then(result =>  result.json())
    .then(fetchData => {
        const template = Handlebars.compile(fetchData.template)
        const html = template({productos: fetchData.productos})
        document.getElementById('productos-placeholder').innerHTML = html
    })

})